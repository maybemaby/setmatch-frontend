import { IUser } from "./IUser";

export interface IRequest {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  sentOn: string;
  isCanceled: boolean;
  accepted: boolean;
}

export interface GetRequestDto extends IRequest {
  sender: IUser;
  receiver: IUser;
}

export type PostRequestDto = {
  message: string;
  senderId: string;
  receiverId: string;
  courtId: string;
  scheduledDate: Date;
};
