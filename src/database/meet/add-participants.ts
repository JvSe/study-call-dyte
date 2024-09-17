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

type ReturnAddUserInMeet = {
  success: boolean;
  data: {
    id: string;
    name: string;
    picture: string;
    custom_participant_id: string;
    preset_name: string;
    created_at: Date;
    updated_at: Date;
    token: string;
  };
};

async function addUserMeet({
  idMeet,
  idParticipant,
  user,
  type_preset,
}: AddUserMeet): Promise<ReturnAddUserInMeet> {
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

  const { data } = response.data as ReturnAddUserInMeet;

  await prisma.participant.update({
    where: {
      id: idParticipant,
    },
    data: {
      user_token: data.token,
      in_room: true,
    },
  });

  const meet = await prisma.meeting.findUnique({
    where: { id: idMeet },
    include: {
      participants: true,
    },
  });

  let isReady: boolean[] = [];

  meet?.participants.forEach((participant) => {
    isReady.push(participant.in_room);
  });

  if (isReady.find((v) => v == false) === undefined)
    await prisma.meeting.update({
      where: { id: idMeet },
      data: {
        ready: true,
      },
    });

  return response.data;
}

export { addUserMeet };
