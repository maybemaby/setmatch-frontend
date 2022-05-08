import { BASE_URL } from ".";
import { ICourt } from "../types/ICourt";
const ENDPOINT = `${BASE_URL}/courts`;

export async function getCourts(authToken: string | null): Promise<ICourt[]> {
  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const res = await fetch(ENDPOINT, {
    method: "GET",
    headers: headers,
  });
  if (res.ok) {
    return (await res.json()) as ICourt[];
  } else {
    throw new Error("Couldn't fetch courts");
  }
}
