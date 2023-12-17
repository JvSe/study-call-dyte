'use client'
import { LocalStorageKeys } from '@/lib/localStorageName';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

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
    localStorage.setItem(LocalStorageKeys.USER_TOKEN, value)
  }

  const addIdMeet = (value: string) => {
    setIdMeet(value);
  };

  useEffect(() => {
    const getInfosMeet = () => {
      const userTokenSaved = localStorage.getItem(LocalStorageKeys.USER_TOKEN);

      if (userTokenSaved !== null) {
        setUserToken(userTokenSaved);
      }
    };
    getInfosMeet();
  }, []);

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
