"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMeet } from "@/hook/meet";
import { useAuth } from "@/store/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { addIdMeet, addUserToken } = useMeet();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signin = useAuth((s) => s.signin);

  const route = useRouter();

  const handleCreateMeet = async () => {
    setIsLoading(true);
    const userResponse = await signin({ email, name });

    // const meet = await createMeeting(`${name}'s Room`);
    // const userToken = await addUserMeet({
    //   idMeet: meet.data.id,
    //   user: { ...userResponse.user! },
    //   createRoom: true,
    // });
    // addIdMeet(meet.data.id);
    // addUserToken(userToken.data.token);

    route.push(`/dashboard`);
  };

  return (
    <main className="w-screen h-screen bg-white flex">
      <div className="w-1/2 h-full hidden lg:flex items-center justify-center">
        <Carousel
          infiniteLoop
          dynamicHeight
          showThumbs={false}
          autoPlay
          className="h-screen w-full object-cover"
          showArrows={true}
        >
          <img
            className="h-screen object-cover"
            src="/imgs/valorant.jpg"
            alt="valorant"
          />
          <img
            className="h-screen object-cover"
            src="/imgs/lol.jpg"
            alt="lol"
          />
          <img className="h-screen object-cover" src="/imgs/r6.jpg" alt="r6" />
        </Carousel>
      </div>
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        <div className="w-1/2 flex flex-col gap-8 items-center">
          <img className="w-44" src="/imgs/img-test.png" alt="logo" />
          <div className="flex flex-col w-full gap-2">
            <Input
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button
            loading={isLoading}
            onClick={handleCreateMeet}
            className="w-full"
          >
            Login
          </Button>
        </div>
      </div>
    </main>
  );
}
