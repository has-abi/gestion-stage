import {Filiere} from "./filiere.model";
import {StageEtudiant} from "./stage-etudiant.model";
import {EtudiantDocument} from "./etudiant-document.model";
import {Utilisateur} from "./utilisateur.model";

export class Etudiant {
  id:number;
  cin:string;
  codeAppoge:string;
  nationalite:string;
  niveau:string;
  situation_familiale:string;
  utilisateur:Utilisateur;
  filiere:Filiere;
  stageEtudiants:Array<StageEtudiant>;
  etudiantDocuments:Array<EtudiantDocument>;

  constructor() {
    this.filiere = new Filiere();
    this.utilisateur = new Utilisateur();
    this.stageEtudiants = new Array<StageEtudiant>();
    this.etudiantDocuments = new Array<EtudiantDocument>();
  }
}