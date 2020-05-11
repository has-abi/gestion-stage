import {TypeDocument} from "./type-document.model";

export class Document {
  id:number;
  titre:string;
  reference:string;
  chemin:string;
  typeDocument:TypeDocument;

  constructor() {
    this.typeDocument = new TypeDocument();
  }
}
