import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetRequestDto, PostRequestDto } from "../types/IRequest";
import { postMatchRequest, getReceived, getSent } from "../handlers/requests";

type UseRequestManagerProps = {
  userId?: string;
  authToken?: string;
  post: {
    onSuccess?: () => void;
  };
};

export const useRequestManager = ({
  userId,
  authToken,
  post: { onSuccess },
}: UseRequestManagerProps) => {
  const client = useQueryClient();

  const postMutation = useMutation(
    ({ dto, authToken }: { dto: PostRequestDto; authToken?: string }) =>
      postMatchRequest(dto, authToken),
    {
      onSuccess: async () => {
        await client.invalidateQueries(["received", userId]);
        if (onSuccess) onSuccess();
      },
    }
  );

  const received = useQuery<GetRequestDto[], Error>(
    ["received", userId],
    () => {
      if (userId) return getReceived(userId, authToken);
      else return [];
    },
    {
      enabled: !!authToken && !!userId,
    }
  );

  const sent = useQuery<GetRequestDto[], Error>(
    ["sent", userId],
    () => {
      if (userId) return getSent(userId, authToken);
      else return [];
    },
    {
      enabled: !!authToken,
    }
  );

  return {
    postMutation,
    received,
    sent,
  };
};
