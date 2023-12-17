"use server";
import { db } from "@/database/client";

export const createUser = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const userInBD = await db.user.findUnique({
    where: { email: email },
  });

  if (userInBD) {
    return { success: true, user: userInBD };
  }

  const user = await db.user.create({
    data: {
      email,
      name,
      photo: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}`,
    },
  });

  if (user) return { success: true, user: user };

  return { success: false };
};
