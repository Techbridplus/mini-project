import { auth } from "@clerk/nextjs/server";

import { currentProfile } from "@/lib/current-profile";

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


  return (
    <div>
        <h1>Server {serverId}</h1>
    </div>
  )
}
