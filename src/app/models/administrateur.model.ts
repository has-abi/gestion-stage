import {User} from "./user.model";

export class Administrateur {
  id:number;
  ref:string;
  profession:string;
  user:User;

  constructor() {
    this.user = new User();
  }
}
