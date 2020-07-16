import {Encadreur} from "../encadreur.model";

export class EncadreurPage {
  content:Array<Encadreur>;
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
  number:number;

  constructor() {
    this.number = 0;
    this.numberOfElements = 0;
  }
}
