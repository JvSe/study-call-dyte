"use server";

import { prisma } from "../prisma";

export const getMeet = async (meetID: string) => {
  console.log(meetID);
  const meet = await prisma.meeting.findUnique({
    where: {
      id: meetID,
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
  });

  console.log(meet);

  return { success: true, meet };
};