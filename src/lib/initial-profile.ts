"use server";

import { currentUser,auth} from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const initialProfile = async () => {
    const { redirectToSignIn } = await auth();
    const user = await currentUser();
    if (!user) return redirectToSignIn(); 
  
    const profile = await db.user.findUnique({
      where: {
        userId: user.id
      }
    });
  
    if (!profile) {
      const name = user.firstName
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : user.id;
    
      await db.user.create({
        data: {
            userId: user.id,
            name: name,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
          }
      });
    }
  };
  