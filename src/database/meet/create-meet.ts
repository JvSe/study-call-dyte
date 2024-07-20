"use server";

import { prisma } from "@/database/prisma";
import { CallEnum } from "@/lib/call-enum";
import axios from "axios";

type CreateMeetProps = {
  titleMeet: string;
  idHost: string;
  idParticipant: string;
};

async function createMeeting({
  titleMeet,
  idHost,
  idParticipant,
}: CreateMeetProps) {
  try {
    const response = await axios.post(
      "https://api.dyte.io/v2/meetings",
      {
        title: titleMeet,
        preferred_region: "ap-south-1",
        record_on_start: false,
        live_stream_on_start: false,
      },
      {
        headers: {
          Authorization:
            "Basic ZjA4MjM2OTQtNTlhYy00NjAzLWFlYWEtYjY5YTY5ODVhN2Q4OjY5YzdjMDcxNWZmODk0OGE1YTNl",
          "Content-Type": "application/json",
        },
      }
    );

    const dataMeeting = response.data.data;

    const meeting = await prisma.meeting.create({
      data: {
        ...dataMeeting,
        participants: {
          create: [
            {
              user: {
                connect: { id: idHost },
              },
            },
            {
              role_call: CallEnum.PARTICIPANT,
              user: {
                connect: { id: idParticipant },
              },
            },
          ],
        },
      },
      include: {
        participants: true,
      },
    });

    return meeting;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
}

export { createMeeting };
