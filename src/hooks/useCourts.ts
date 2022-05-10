import { useQuery } from "react-query";
import { getCourts } from "../handlers/courts";
import { ICourt } from "../types/ICourt";

export function useCourts(
  authToken: string | null,
  page?: number,
  query?: string
) {
  return useQuery<ICourt[], Error>(
    ["courts", page, query],
    () => getCourts(authToken, page, 10, query),
    {
      enabled: !!authToken,
      keepPreviousData: true,
    }
  );
}
