"use server";

import { prisma } from "../prisma";

export const createUser = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const userInBD = await prisma.user.findUnique({
    where: { email },
  });

  if (userInBD) {
    return { success: true, user: userInBD };
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      photo: `https://avatar.iran.liara.run/public`,
      online: true,
    },
  });

  if (user) return { success: true, user: user };

  return { success: true };
};
