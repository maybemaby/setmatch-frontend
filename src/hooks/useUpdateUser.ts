import { useMutation, useQueryClient } from "react-query";
import { putUser } from "../handlers/users";
import { PutUserDto } from "../types/IUser";

export const useUpdateUser = () => {
  const client = useQueryClient();

  const mutation = useMutation(
    ({
      authToken,
      id,
      dto,
    }: {
      authToken: string;
      id: string;
      dto: PutUserDto;
    }) => putUser(id, dto, authToken ?? undefined),
    {
      onSuccess: () => client.invalidateQueries("user"),
    }
  );

  return mutation;
};
