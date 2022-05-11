import { useQuery } from "react-query";
import { getUser } from "../handlers/users";
import { IUser } from "../types/IUser";

export const useUser = (authToken: string | null, id: string) => {
  return useQuery<IUser, Error>(
    ["user"],
    () => getUser(id, authToken ?? undefined),
    {
      enabled: !!authToken,
    }
  );
};
