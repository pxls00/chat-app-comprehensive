export interface IUser {
  email: string
  name: string | null,
  uuid: string | null,
};

export interface IUserStore {
  user: IUser,
};