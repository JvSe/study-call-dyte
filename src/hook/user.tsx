'use client'
import { ReactNode, createContext, useContext, useState } from 'react';

type MeetType = {
  children: ReactNode
};

type MeetContextType = {
  userToken: string;
  idMeet: string;
  addUserToken: (value: string) => void;
  addIdMeet: (value: string) => void;
}

const MeetContext = createContext({} as MeetContextType);

function MeetProvider({ children }: MeetType) {
  const [userToken, setUserToken] = useState<string>('');
  const [idMeet, setIdMeet] = useState<string>('');

  const addUserToken = (value: string) => {
    setUserToken(value)
  }

  const addIdMeet = (value: string) => {
    setIdMeet(value);
  }
  return (
    <MeetContext.Provider
      value={{
        userToken,
        idMeet,
        addUserToken,
        addIdMeet
      }}
    >

      {children}
    </MeetContext.Provider>
  )
};

function useMeet() {
  return useContext(MeetContext);
};

export { MeetProvider, useMeet };
