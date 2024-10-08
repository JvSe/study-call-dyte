"use client";

import { DialogModal } from "@/components/dialog-notify";
import {
  GlassMorphismAction,
  GlassMorphismActionTitle,
} from "@/components/glassmorphism/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createMeeting } from "@/database/meet/create-meet";
import { useSupabase } from "@/hook/use-supabase";
import { useAuth } from "@/store/use-auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { users } = useSupabase();
  const [userAuth, signout] = useAuth((s) => [s.user, s.signout]);
  const route = useRouter();

  const handleSignout = () => {
    signout();

    route.push("/");
  };

  const handleCreateAMeet = async (idParticipant: string) => {
    const meet = await createMeeting({
      titleMeet: `${userAuth.name}'s Room`,
      idHost: userAuth.id,
      idParticipant: idParticipant,
    });

    window.open(`/call/${meet.id}`);
  };

  return (
    <div className="container relative h-screen bg-[#e2e2e2] flex">
      <DialogModal />
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
        {users.length === 0 && <p className="mt-auto">Nenhum usuário logado</p>}
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
        <div className="flex gap-2 mt-auto">
          <Button onClick={handleSignout} variant="secondary" className="w-32">
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
