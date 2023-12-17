import { User } from "@prisma/client";
import axios from "axios";
import { v4 } from "uuid";

type AddUserMeet = {
  idMeet: string;
  user: User;
  createRoom?: boolean;
};

async function addUserMeet({ idMeet, user, createRoom = false }: AddUserMeet) {
  console.log("user => ", user);
  console.log("photo =>", user.photo);
  const response = await axios.post(
    `https://api.dyte.io/v2/meetings/${idMeet}/participants`,
    {
      name: user.name,
      picture: user.photo,
      preset_name: createRoom ? "group_call_host" : "group_call_participant",
      custom_participant_id: v4(),
    },
    {
      headers: {
        Authorization:
          "Basic ZjA4MjM2OTQtNTlhYy00NjAzLWFlYWEtYjY5YTY5ODVhN2Q4OjY5YzdjMDcxNWZmODk0OGE1YTNl",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export { addUserMeet };
