import axios from "axios";
import { v4 } from "uuid";

async function addUserMeet(idMeet: string, nick: string) {
  const response = await axios.post(
    `https://api.dyte.io/v2/meetings/${idMeet}/participants`,
    {
      name: nick,
      picture:
        "https://i0.wp.com/anmtv.com.br/wp-content/uploads/2023/04/minato-naruto.jpg?w=800&ssl=1",
      preset_name: "group_call_host",
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
