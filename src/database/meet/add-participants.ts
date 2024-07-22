"use server";

import { CallEnum } from "@/lib/call-enum";
import { User } from "@prisma/client";
import axios from "axios";
import { prisma } from "../prisma";

type AddUserMeet = {
  idMeet: string;
  idParticipant: string;
  user: User;
  type_preset: CallEnum;
};

async function addUserMeet({
  idMeet,
  idParticipant,
  user,
  type_preset,
}: AddUserMeet) {
  const response = await axios.post(
    `https://api.dyte.io/v2/meetings/${idMeet}/participants`,
    {
      name: user.name,
      picture: user.photo,
      preset_name: type_preset,
      custom_participant_id: idParticipant,
    },
    {
      headers: {
        Authorization: `Basic ${process.env.DYTE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  await prisma.participant.update({
    where: {
      id: idParticipant,
    },
    data: {
      user_token: response.data.data.token,
    },
  });

  return response.data;
}

export { addUserMeet };
