import {Utilisateur} from "./utilisateur.model";
import {StageMembreJury} from "./stage-membre-jury.model";

export class MembreJury {
  id:number;
  reference:string;
  profession:string;
  utilisateur:Utilisateur;
  stageMembrejuries:Array<StageMembreJury>;

  constructor() {
    this.utilisateur = new Utilisateur();
    this.stageMembrejuries = new Array<StageMembreJury>();
  }
}
