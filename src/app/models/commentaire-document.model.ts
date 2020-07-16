import {User} from "./user.model";
import {Document} from "./document.model";

export class CommentaireDocument {
  id:number;
  contenu:string;
  dateCreation:Date;
  dateModification:Date;
  user:User;
  document:Document;
}
