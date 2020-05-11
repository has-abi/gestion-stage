import {Utilisateur} from "./utilisateur.model";
import {SujetForum} from "./sujet-forum.model";

export class Commentaire {
  id:number;
  contenu:string;
  dateCreation:Date;
  dateModification:Date;
  utilisateur:Utilisateur;
  commentaire:Commentaire;
  sujetForum:SujetForum;
  commentaires:Array<Commentaire>;

  constructor() {
    this.utilisateur = new Utilisateur();
    this.sujetForum = new SujetForum();
    this.commentaire = new Commentaire();
    this.commentaires = new Array<Commentaire>();
  }
}
