import { useQuery } from "react-query";
import { SearchUserParams, searchUsers } from "../handlers/users";
import { IUser } from "../types/IUser";

export const useSearchUsers = (
  { homeCourtId, maxNtrp, minNtrp, page, exclude }: SearchUserParams,
  authToken?: string
) => {
  return useQuery<IUser[], Error>(
    ["search", page, homeCourtId, maxNtrp, minNtrp],
    () => {
      return searchUsers(
        { minNtrp, maxNtrp, page, homeCourtId, exclude },
        authToken
      );
    },
    {
      enabled: !!authToken && !!exclude,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
