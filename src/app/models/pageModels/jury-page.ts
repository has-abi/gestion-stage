import {MembreJury} from "../membre-jury.model";

export class JuryPage {
  content:Array<MembreJury>
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
  number:number;
}
