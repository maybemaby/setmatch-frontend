import { useQuery } from "react-query";
import { getCourts } from "../handlers/courts";
import { ICourt } from "../types/ICourt";

export function useCourts(authToken: string | null, page?: number) {
  return useQuery<ICourt[], Error>(
    ["courts", page],
    () => getCourts(authToken, page),
    {
      enabled: !!authToken,
      keepPreviousData: true,
    }
  );
}
