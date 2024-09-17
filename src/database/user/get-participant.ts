"use server";

import { prisma } from "../prisma";

export const getParticipantMeet = async ({
  userID,
  meetingId,
}: {
  userID: string;
  meetingId: string;
}) => {
  const participant = await prisma.user
    .findUnique({
      where: {
        id: userID,
      },
      include: {
        participant: {
          where: {
            meeting_id: meetingId,
          },
        },
      },
    })
    .then((r) => r?.participant);

  return { success: true, participant };
};
