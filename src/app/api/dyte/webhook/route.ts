import { prisma } from "@/database/prisma";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Process the webhook payload

    console.log(body);

    var meeting = body.meeting as Prisma.JsonObject;

    await prisma.webhookEvent.create({
      data: {
        event: body.event,
        reason: body.reason,
        meeting,
      },
    });

    toast("WebSocket atualizando! ");

    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    });
  }
}
