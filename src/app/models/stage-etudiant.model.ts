import {Stage} from "./stage.model";
import {Etudiant} from "./etudiant.model";

export class StageEtudiant {
  id:number;
  dateAffectation:Date;
  remarque:string;
  etudiant:Etudiant;

  constructor() {
    this.etudiant = new Etudiant();
  }
}
