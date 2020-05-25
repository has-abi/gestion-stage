import {User} from "./user.model";
import {StageMembreJury} from "./stage-membre-jury.model";

export class MembreJury {
  id:number;
  reference:string;
  profession:string;
  user:User;
  stageMembrejuries:Array<StageMembreJury>;

  constructor() {
    this.user = new User();
    this.stageMembrejuries = new Array<StageMembreJury>();
  }
}
