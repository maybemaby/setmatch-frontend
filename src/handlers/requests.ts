import { GetRequestDto, IRequest, PostRequestDto } from "../types/IRequest";
import { BASE_URL } from ".";

const requestsUrl = `${BASE_URL}/requests`;

export const postMatchRequest = async (
  dto: PostRequestDto,
  authToken?: string
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(requestsUrl, {
    method: "POST",
    body: JSON.stringify(dto),
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("Could not post match request");
  }

  return (await res.json()) as IRequest;
};

export const getReceived = async (userId: string, authToken?: string) => {
  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${requestsUrl}/${userId}/received`, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("Could not retrieve requests");
  }

  return (await res.json()) as GetRequestDto[];
};

export const getSent = async (userId: string, authToken?: string) => {
  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${requestsUrl}/${userId}/sent`, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("Could not retrieve requests");
  }

  return (await res.json()) as GetRequestDto[];
};
