"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signin = useAuth((s) => s.signin);

  const route = useRouter();

  const handleCreateMeet = async () => {
    setIsLoading(true);
    await signin({ email, name });

    route.push(`/dashboard`);
  };

  return (
    <main className="w-screen h-screen bg-white flex items-center">
      <Card className="w-[550px] h-min mx-auto shadow-lg">
        <CardContent className="py-10">
          <div className="w-full flex flex-col gap-8 items-center">
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
              type="button"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
