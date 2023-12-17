import axios from "axios";

async function createMeeting(title: string = "Título padrão") {
  console.log("title =>", title);
  const response = await axios.post(
    "https://api.dyte.io/v2/meetings",
    {
      title,
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

  return response.data;
}

export { createMeeting };
