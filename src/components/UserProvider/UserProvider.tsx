import { createContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useUser } from "../../hooks/useUser";
import { IUser } from "../../types/IUser";

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserStore | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { accounts } = useMsal();
  const authToken = useAccessToken();
  const { data } = useUser(authToken, accounts[0]?.localAccountId);

  // When mounting and user is authenticated, sometimes UserProvider is not yet set.
  // i.e when url is manually changed.
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
