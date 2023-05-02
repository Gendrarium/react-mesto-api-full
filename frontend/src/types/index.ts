export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  about: string;
  __v?: number;
}

export interface ICard {
  _id: string;
  name: string;
  link: string;
  likes: string[];
  owner: IUser;
  createdAt: string;
  __v?: number;
}
