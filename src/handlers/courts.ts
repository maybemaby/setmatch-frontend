import { BASE_URL } from ".";
import { ICourt } from "../types/ICourt";
const ENDPOINT = `${BASE_URL}/courts`;

export async function getCourts(
  authToken: string | null,
  page = 1,
  size = 10,
  query?: string
): Promise<ICourt[]> {
  const uri = new URL(ENDPOINT);
  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  uri.searchParams.append("p", page.toString());
  uri.searchParams.append("size", size.toString());
  if (query && query.length > 0) uri.searchParams.append("q", query);

  const res = await fetch(uri.toString(), {
    method: "GET",
    headers: headers,
  });
  if (res.ok) {
    return (await res.json()) as ICourt[];
  } else {
    throw new Error("Couldn't fetch courts");
  }
}
