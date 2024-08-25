export interface IUser {
    email: string;
    uuid: string;
    password: string;
    name: string | null;
  }
  
  export type IUserDTO = Omit<IUser, "password">;