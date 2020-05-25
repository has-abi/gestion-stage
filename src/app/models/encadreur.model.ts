import {User} from "./user.model";
import {StageEncadreur} from "./stage-encadreur.model";

export class Encadreur {
  id:string;
  reference:string;
  remarque:string;
  profession:string;
  qualite:string;
  type:string;
  user:User;
  stageEncadreurs:Array<StageEncadreur>;


  constructor() {
    this.user = new User();
    this.stageEncadreurs = new Array<StageEncadreur>();
  }
}
