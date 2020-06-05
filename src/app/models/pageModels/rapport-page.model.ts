import {Rapport} from "../rapport.model";

export class RapportPage {
  content:Array<Rapport>
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
  number:number;
}
