import {Stage} from "./stage.model";
import {Tache} from "./tache.model";

export class RapportTache {
  id:number;
  dateDepot:Date;
  dateModification:Date;
  valider:boolean;
  stage:Stage;
  tache:Tache;

  constructor() {
    this.stage = new Stage();
    this.tache = new Tache();
  }
}
