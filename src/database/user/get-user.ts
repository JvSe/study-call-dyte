"use server";

import { prisma } from "../prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return { success: true, users: users };
};
