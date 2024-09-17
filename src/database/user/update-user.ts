"use server";

import { User } from "@prisma/client";
import { prisma } from "../prisma";

export const updateUsers = async (user: User) => {
  const updatedUser = await prisma.user.update({
    data: {
      ...user,
    },
    where: {
      id: user.id,
    },
  });

  return { success: true, user: updatedUser };
};
