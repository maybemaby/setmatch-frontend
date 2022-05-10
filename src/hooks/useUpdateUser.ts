import { useMutation } from "react-query";
import { putUser } from "../handlers/users";
import { PutUserDto } from "../types/IUser";

export const useUpdateUser = () => {
  const mutation = useMutation(
    ({
      authToken,
      id,
      dto,
    }: {
      authToken: string;
      id: string;
      dto: PutUserDto;
    }) => putUser(id, dto, authToken ?? undefined)
  );

  return mutation;
};
