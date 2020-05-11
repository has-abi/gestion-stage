import {Utilisateur} from "./utilisateur.model";
import {Stage} from "./stage.model";
import {Commentaire} from "./commentaire.model";

export class SujetForum {
  id:number;
  reference:string;
  content:string;
  dateCreation:Date;
  dateModification:Date;
  suprimer:boolean;
  utilisateur:Utilisateur;
  stage:Stage;
  commentaires:Array<Commentaire>;

  constructor() {
    this.stage = new Stage();
    this.utilisateur = new Utilisateur();
    this.commentaires = new Array<Commentaire>();
  }
}
