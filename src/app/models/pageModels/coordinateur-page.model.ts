import {Coordinateur} from "../coordinateur.model";

export class CoordinateurPage {
  content:Array<Coordinateur>;
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
