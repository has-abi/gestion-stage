import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthentificationService} from "./auth/authentification.service";
import {CommentaireDocument} from "../models/commentaire-document.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentDocService {
  private _commentDocument:CommentaireDocument;
  private _commentDocuments:Array<CommentaireDocument>;
  private url="http://localhost:8091/gestion-stage-api/commentaireDocument/"
  constructor(private http:HttpClient,private authentificationService: AuthentificationService) { }

  findByUser(id:number){
    this.http.get<Array<CommentaireDocument>>(this.url+"user/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.commentDocuments =  datas;
    })
  }

  findByDocument(id:number):Observable<Array<CommentaireDocument>>{
    return this.http.get<Array<CommentaireDocument>>(this.url+"document/id/"+id,{headers:this.authentificationService.getHeaders()});
  }

  create(c:CommentaireDocument):Observable<number>{
    return  this.http.post<number>(this.url,c,{headers:this.authentificationService.getHeaders()});
  }

  update(c:CommentaireDocument):Observable<number>{
    return  this.http.put<number>(this.url,c,{headers:this.authentificationService.getHeaders()});
  }

  delete(id:number):Observable<number>{
    return  this.http.delete<number>(this.url+"id/"+id,{headers:this.authentificationService.getHeaders()});
  }

  get commentDocument(): CommentaireDocument {
    if(this._commentDocument == null){
      this._commentDocument = new CommentaireDocument();
    }
    return this._commentDocument;
  }

  set commentDocument(value: CommentaireDocument) {
    this._commentDocument = value;
  }

  get commentDocuments(): Array<CommentaireDocument> {
    if(this._commentDocuments == null){
      this._commentDocuments = new Array<CommentaireDocument>();
    }
    return this._commentDocuments;
  }

  set commentDocuments(value: Array<CommentaireDocument>) {
    this._commentDocuments = value;
  }
}
