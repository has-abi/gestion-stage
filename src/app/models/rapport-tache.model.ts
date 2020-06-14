import {Stage} from "./stage.model";
import {Tache} from "./tache.model";
import {Document} from "./document.model";

export class RapportTache {
  id:number;
  dateDepot:Date;
  reference:string;
  dateModification:Date;
  valider:boolean;
  document:Document;
  descreption:string;
  stage:Stage;
  tache:Tache;

}
