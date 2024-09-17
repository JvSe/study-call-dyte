"use server";

import { Participant } from "@prisma/client";
import { prisma } from "../prisma";

export const updateParticipant = async (participant: Participant) => {
  const updatedUser = await prisma.participant.update({
    data: {
      ...participant,
    },
    where: {
      id: participant.id,
    },
  });

  return { success: true, participant: updatedUser };
};
