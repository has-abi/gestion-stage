import {Stage} from "./stage.model";
import {MembreJury} from "./membre-jury.model";

export class StageMembreJury {
  id:number;
  dateAffectation:Date;
  role:string;
  remarque:string;
  stage:Stage;
  membreJury:MembreJury;

  constructor() {
    this.membreJury = new MembreJury();
    this.stage = new Stage();

  }
}
