import { createContext, useState } from "react";
import { IUser } from "../../types/IUser";

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserStore | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
