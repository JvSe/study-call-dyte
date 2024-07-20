"use server";

import { prisma } from "../prisma";

export const createUser = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        photo: `https://avatar.iran.liara.run/public`,
        online: true,
      },
    });
  } else {
    await prisma.user.update({
      where: { email },
      data: { online: true },
    });
  }

  if (user) return { success: true, user: user };

  return { success: true };
};
