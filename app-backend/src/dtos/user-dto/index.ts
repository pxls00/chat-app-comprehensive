import type { IUser, IUserDTO } from "./user-dto.types";

export default class UserDTO implements IUserDTO {
  email: string;
  uuid: string;
  name: string | null;

  constructor(model: IUser) {
    this.email = model.email;
    this.uuid = model.uuid;
    this.name = model.name;
  }
}