'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMeet } from "@/hook/user";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { addUserMeet } from "./lib/add-user-meet";
import { createMeeting } from "./lib/create-meet";


export default function Home() {
  const [nick, setNick] = useState<string>('');
  const [nameRoom, setNameRoom] = useState<string>('');
  const { addIdMeet, addUserToken } = useMeet();

  const route = useRouter();

  const handleCreateMeet = async () => {
    const meet = await createMeeting(nameRoom);
    const userToken = await addUserMeet(meet.data.id, nick);

    addIdMeet(meet.data.id);
    addUserToken(userToken.data.token);

    route.push(`/call/${meet.data.id}`)
  }

  return (
    <main className="w-screen h-screen flex">
      <div className="w-1/2 h-full hidden lg:flex items-center bg-red-100 justify-center">
        left
      </div>
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        <div className="w-1/2 flex flex-col gap-8 items-center">
          <img className="w-44" src="/imgs/img-test.png" alt="logo" />
          <div className="flex flex-col w-full gap-2">
            <Input placeholder="Name Room" onChange={e => setNameRoom(e.target.value)} />
            <Input placeholder="Nickname" onChange={e => setNick(e.target.value)} />
          </div>
          <Button onClick={handleCreateMeet} className="w-full">Create Room</Button>
        </div>
      </div>
    </main>
  )
}
