import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import ServerPage from "@/components/server/server-page";
import { db } from "@/lib/db";
interface ServerIdPageProps {
  params: Promise<{
    serverId: string;
  }>;
}

export default async function ServerIdPage({ params }: ServerIdPageProps) {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth()
  const { serverId } = await params;
  if (!profile) return redirectToSignIn();
  const server = await db.server.findUnique({
      where: {
        id: serverId
      },
      include: {
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    });

    if (!server) return redirect("/");
    const members = server?.members.filter(
      (member) => member.userId !== profile.id
    );
    const role = server.members.find(
      (member) => member.userId === profile.id
    )?.role;

    if (!role) return redirect("/");

  return (
    <div>
      <ServerPage serverId={serverId} role={role} server={server} />
    </div>
  )
}
