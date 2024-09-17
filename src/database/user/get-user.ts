"use server";

import { prisma } from "../prisma";

export const getUsers = async (userID: string) => {
  const users = await prisma.user.findMany({
    where: {
      online: true,
      NOT: {
        id: userID,
      },
    },
  });

  return { success: true, users: users };
};
