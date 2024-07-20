"use client";

import {
  GlassMorphismAction,
  GlassMorphismActionTitle,
} from "@/components/glassmorphism/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createMeeting } from "@/database/meet/create-meet";
import { getUsers } from "@/database/user/get-user";
import { useAuth } from "@/store/use-auth";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [users, setUsers] = useState([] as User[]);

  const userAuth = useAuth((s) => s.user);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      const response = await getUsers();
      const data = response.users;
      setUsers(data.filter((u) => u.id !== userAuth.id));
    };

    fetchOnlineUsers();
  }, [userAuth]);

  const handleCreateAMeet = async (idParticipant: string) => {
    const meet = await createMeeting({
      titleMeet: `${userAuth.name}'s Room`,
      idHost: userAuth.id,
      idParticipant: idParticipant,
    });
    // const userToken = await addUserMeet({
    //   idMeet: meet.data.id,
    //   user: { ...userResponse.user! },
    //   createRoom: true,
    // });
    // addIdMeet(meet.data.id);
    // addUserToken(userToken.data.token);

    console.log(meet);
  };

  return (
    <div className="container relative h-screen bg-[#e2e2e2] flex">
      <div className=" absolute top-20  flex justify-center items-center gap-2">
        <Avatar className="w-14 h-14">
          <AvatarImage src={userAuth.photo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p>{userAuth.name}</p>
          <span className="text-sm text-gray-600">Online</span>
        </div>
      </div>
      <div className="w-full h-full flex flex-col py-14 gap-2 items-center justify-center">
        {users.map((user) => (
          <GlassMorphismAction
            className="mt-auto"
            key={user.id}
            onClick={() => handleCreateAMeet(user.id)}
          >
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={user.photo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <GlassMorphismActionTitle>{user.name}</GlassMorphismActionTitle>
            </div>
          </GlassMorphismAction>
        ))}
        <Button className="mt-auto">Entrar na call</Button>
      </div>
    </div>
  );
}
