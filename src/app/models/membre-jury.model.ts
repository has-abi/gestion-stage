import {User} from "./user.model";
import {StageMembreJury} from "./stage-membre-jury.model";

export class MembreJury {
  id:number;
  reference:string;
  profession:string;
  user:User;
  constructor() {
    this.user = new User();

  }
}
