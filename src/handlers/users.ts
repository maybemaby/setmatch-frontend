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

export type SearchUserParams = {
  minNtrp?: number;
  maxNtrp?: number;
  page?: number;
  size?: number;
  homeCourtId?: string;
};

export async function searchUsers(
  { minNtrp, maxNtrp, page, size, homeCourtId }: SearchUserParams,
  authToken?: string
): Promise<IUser[]> {
  const uri = new URL(`${ENDPOINT}/search`);
  uri.searchParams.append("minNtrp", (minNtrp ?? 1.5).toString());
  uri.searchParams.append("maxNtrp", (maxNtrp ?? 7).toString());
  uri.searchParams.append("p", (page ?? 1).toString());
  uri.searchParams.append("size", (size ?? 10).toString());
  if (homeCourtId) {
    uri.searchParams.append("homeCourt", homeCourtId);
  }

  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const res = await fetch(uri.toString(), {
    headers: headers,
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Couldn't fetch users");
  }
  return (await res.json()) as IUser[];
}
