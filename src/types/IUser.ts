import { ICourt } from "./ICourt";

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  about?: string;
  homeCourt?: ICourt;
  ntrpRating?: number;
  ratingEstimated?: boolean;
  signupDate: string;
}

export type PutUserDto = {
  firstName: string;
  lastName: string;
  username: string;
  about?: string;
  ntrpRating?: number;
  ratingEstimated?: boolean;
  homeCourtId?: string;
};
