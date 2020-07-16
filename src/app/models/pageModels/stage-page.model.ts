import {Stage} from "../stage.model";

export class StagePage {
  content : Array<Stage>;
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
