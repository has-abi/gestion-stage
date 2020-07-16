import {Stage} from "./stage.model";
import {Encadreur} from "./encadreur.model";
import {MembreJury} from "./membre-jury.model";

export class Planning {
  id:number;
  stages:Array<Stage>;
  locale:string;
  encadrant:Encadreur;
  jurys:Array<MembreJury>
  constructor(){
	this.stages = new Array<Stage>();
	this.encadrant = new Encadreur();
	this.jurys = new Array<MembreJury>();
  }
}
