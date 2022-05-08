import { useQuery } from "react-query";
import { getCourts } from "../handlers/courts";
import { ICourt } from "../types/ICourt";

export function useCourts(authToken: string | null) {
  return useQuery<ICourt[], Error>(["courts"], () => getCourts(authToken), {
    enabled: !!authToken,
  });
}
