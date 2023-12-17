import { useAuth } from "@/hook/auth";
import { useMeet } from "@/hook/meet";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { addUserMeet } from "@/lib/dyte/add-user-meet";

type ModalSignin = {
  open: boolean,
  onClose: () => void;
  idMeet: string;
}

export function ModalSignIn({ open, onClose, idMeet }: ModalSignin) {
  const { addIdMeet, addUserToken } = useMeet();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signin } = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  console.log('entrei aqui =>', idMeet)

  const handleEnterInMeet = async () => {
    setIsLoading(true);
    const userResponse = await signin({ email, name });
    const userToken = await addUserMeet({ idMeet: idMeet, user: { ...userResponse.user! }, createRoom: true });
    addIdMeet(idMeet);
    addUserToken(userToken.data.token);
  }

  return (
    <Dialog modal open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Signin in Call</DialogTitle>
          <DialogDescription>
            Signin to access a meet
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button loading={isLoading} onClick={handleEnterInMeet} type="submit">Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}