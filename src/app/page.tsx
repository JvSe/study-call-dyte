'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hook/auth";
import { useMeet } from "@/hook/meet";
import { addUserMeet } from "@/lib/dyte/add-user-meet";
import { createMeeting } from "@/lib/dyte/create-meet";
import { SingInValidation, singInValidation } from "@/lib/forms/signin-schema";
import socketClient from "@/lib/socket/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { addIdMeet, addUserToken } = useMeet();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signin } = useAuth();

  const form = useForm<SingInValidation>({
    resolver: zodResolver(singInValidation)
  });

  const onSubmit: SubmitHandler<SingInValidation> = (data) => {
    console.log("data =>", data);
  }

  const route = useRouter();

  const handleCreateMeet = async () => {
    setIsLoading(true);
    const userResponse = await signin({ email, name });
    const meet = await createMeeting(`${name}'s Room`);
    const userToken = await addUserMeet({ idMeet: meet.data.id, user: { ...userResponse.user! }, createRoom: true });
    addIdMeet(meet.data.id);
    addUserToken(userToken.data.token);
    route.push(`/call/${meet.data.id}`);
  }

  useEffect(() => {
    socketClient();
  }, [])

  return (
    <main className="w-screen h-screen flex">
      <div className="w-1/2 h-full hidden lg:flex items-center justify-center">
        <Carousel infiniteLoop dynamicHeight showThumbs={false} autoPlay className="h-screen w-full object-cover" showArrows={true}>
          <img className="h-screen object-cover" src="/imgs/valorant.jpg" alt="valorant" />
          <img className="h-screen object-cover" src="/imgs/lol.jpg" alt="lol" />
          <img className="h-screen object-cover" src="/imgs/r6.jpg" alt="r6" />
        </Carousel>
      </div>
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        <div className="w-1/2 flex flex-col gap-8 items-center">
          <img className="w-44" src="/imgs/img-test.png" alt="logo" />
          <div className="flex flex-col w-full gap-2">
            <Form {...form}>
              <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="E-mail" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" loading={isLoading} className="w-full mt-8">Create Room</Button>

              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  )
}
