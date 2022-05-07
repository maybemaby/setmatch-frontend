import { BASE_URL } from ".";

const ENDPOINT = `${BASE_URL}/user`;

export async function postUser(authToken?: string) {
  let headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: headers,
  });
}
