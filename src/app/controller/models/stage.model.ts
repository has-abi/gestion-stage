import {OrganismeAccueil} from "./organisme-accueil.model";
import {TypeStage} from "./type-stage.model";
import {StageEtudiant} from "./stage-etudiant.model";
import {StageEncadreur} from "./stage-encadreur.model";
import {StageMembreJury} from "./stage-membre-jury.model";

export class Stage {
  id:number;
  reference:string;
  sujet:string;
  dateDebut:Date;
  dateFin:Date;
  dateCreation:Date;
  statu:boolean;
  organismeAccueil:OrganismeAccueil;
  typeStage:TypeStage;
  stageEtudiants:Array<StageEtudiant>;
  stageEncadreurs:Array<StageEncadreur>;
  stageMembreJuries:Array<StageMembreJury>;

  constructor() {
    this.organismeAccueil = new OrganismeAccueil();
    this.typeStage = new TypeStage();
    this.stageEtudiants = new Array<StageEtudiant>();
    this.stageEncadreurs = new Array<StageEncadreur>();
    this.stageMembreJuries = new Array<StageMembreJury>();
  }
}
