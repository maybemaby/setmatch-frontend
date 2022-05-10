import { createContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { getUser } from "../../handlers/users";
import { IUser } from "../../types/IUser";
import { loginRequest } from "../../config";

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserStore | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { instance, accounts } = useMsal();

  // When mounting and user is authenticated, sometimes UserProvider is not yet set.
  // i.e when url is manually changed.
  useEffect(() => {
    instance.setActiveAccount(accounts[0]);
    const account = instance.getActiveAccount();
    if (account !== null && user === null) {
      instance
        .acquireTokenSilent(loginRequest)
        .then((res) => {
          getUser(account.localAccountId, res.accessToken)
            .then((user) => setUser({ ...user }))
            .catch((err) => {
              if (err instanceof Error) {
                throw err;
              }
            });
        })
        .catch((err) => {
          console.error(err);
          setUser(null);
        });
    }
  }, [accounts]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
