import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import ServerPage from "@/components/server/server-page";
import ServerHeader from "@/components/server/server-header";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { MobileToggle } from "@/components/mobile-toggle";

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
      <div className="flex items-center justify-between">
        <MobileToggle serverId={serverId} groupId="" />
        <ServerHeader serverId={serverId} role={role} server={server} />
      </div>
      
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      <ServerPage serverId={serverId} role={role} server={server} />
    </div>
  )
}
