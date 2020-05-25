import {Filiere} from "./filiere.model";
import {User} from "./user.model";

export class Coordinateur {
  id:number;
  reference:string;
  filiere:Filiere;
  user:User;

  constructor() {
    this.filiere = new Filiere();
    this.user = new User();
  }
}
