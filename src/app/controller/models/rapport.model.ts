import {Stage} from "./stage.model";
import {Document} from "./document.model";

export class Rapport {
  id:number;
  dateValidation:Date;
  dateSoutenance:Date;
  dateDepot:Date;
  valider:boolean;
  descreption:string;
  localeSoutenance:string;
  stage:Stage;
  document:Document;

  constructor() {
    this.stage = new Stage();
    this.document = new Document();
  }
}
