import {Ville} from "./ville.model";

export class Pays {
  id:number;
  nom:string;
  villes:Array<Ville>;

  constructor() {
    this.villes = new Array<Ville>();
  }
}
