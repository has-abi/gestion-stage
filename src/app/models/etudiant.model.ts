import {Filiere} from "./filiere.model";
import {StageEtudiant} from "./stage-etudiant.model";

import {User} from "./user.model";

export class Etudiant {
  id:number;
  cin:string;
  codeAppoge:string;
  nationalite:string;
  niveau:string;
  situation_familiale:string;
  user:User;
  filiere:Filiere;
  stageEtudiants:Array<StageEtudiant>;

  constructor() {
    this.filiere = new Filiere();
    this.user = new User();
  }
}
