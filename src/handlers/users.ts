import { BASE_URL } from ".";
import { IUser, PutUserDto } from "../types/IUser";

const ENDPOINT = `${BASE_URL}/user`;

export async function postUser(authToken?: string) {
  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: headers,
  });
  return res;
}

// Retrieve User model from backend using id
export async function getUser(id: string, authToken?: string) {
  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "GET",
    headers: headers,
  });
  if (!res.ok) {
    throw new Error(
      ((await res.json()) as { message: string; status: number }).message
    );
  }
  return (await res.json()) as IUser;
}

export async function putUser(id: string, dto: PutUserDto, authToken?: string) {
  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    throw new Error("Cannot process PUT request to " + ENDPOINT);
  }
  return true;
}
