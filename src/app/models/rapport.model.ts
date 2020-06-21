import {Stage} from "./stage.model";
import {Document} from "./document.model";

export class Rapport {
  id:number;
  reference:string;
  dateValidation:Date;
  dateDepot:Date;
  valider:boolean;
  descreption:string;
  document:Document;

  constructor() {
    this.document = new Document();
  }
}
