import {Stage} from "./stage.model";
import {Etudiant} from "./etudiant.model";

export class StageEtudiant {
  id:number;
  dateAffectation:Date;
  remarque:string;
  stage:Stage;
  etudiant:Etudiant;

  constructor() {
    this.etudiant = new Etudiant();
    this.stage = new Stage();
  }
}
