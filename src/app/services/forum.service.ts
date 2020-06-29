import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SujetForum} from "../models/sujet-forum.model";
import {ForumPage} from "../models/pageModels/forum-page.model";
import {Commentaire} from "../models/commentaire.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private url = "http://localhost:8091/gestion-stage-api/sujetForum/";
  private urlComment = "http://localhost:8091/gestion-stage-api/commentaire/"
  private _sujetForum:SujetForum;
  private _sujetForums:Array<SujetForum>;
  private _userSujets:Array<SujetForum>;
  private _forumPage:ForumPage;
  private _commentaire:Commentaire;
  private _commentaires:Array<Commentaire>;
  tableElements = [];
  constructor(private http:HttpClient,private authentificationService:AuthentificationService) { }
  countForum():Observable<number>{
    return this.http.get<number>(this.url+"count",{headers:this.authentificationService.getHeaders()});
  }
  findAllSujets(page:number,size:number,sort:string){
    this.http.get<ForumPage>(this.url+"page/"+page+"/size/"+size+"/sort/"+sort,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.forumPage = datas;
      this.fillTableElements(datas.totalPages);
    })
  }
  findById(id:number){
    this.http.get<SujetForum>(this.url+"id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(res=>{
      this.sujetForum = res;
    })
  }
  findByUserId(id:number){
    this.http.get<Array<SujetForum>>(this.url+"user/id/"+id).subscribe(datas=>{
      this._userSujets = datas;
    });
  }
  findByContentContains(content:string){
    this.http.get<Array<SujetForum>>(this.url+"content/"+content,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.sujetForums = datas;
    })
  }

  searchSujet(search:string):Observable<Array<SujetForum>>{
	 
    return this.http.get<Array<SujetForum>>(this.url+"search?search=content:*"+search+"*",{headers:this.authentificationService.getHeaders()});
	
  }

  save():Observable<number>{
    this.sujetForum.reference = this.getReference();
    return  this.http.post<number>(this.url,this.sujetForum,{headers:this.authentificationService.getHeaders()});
  }
  update():Observable<number>{
    return this.http.put<number>(this.url,this.sujetForum,{headers:this.authentificationService.getHeaders()});
  }

  removeByRef(ref:string):Observable<number>{
    return this.http.delete<number>(this.url+"remove/reference/"+ref,{headers:this.authentificationService.getHeaders()});
  }

  fillTableElements(size:number) {
    for (let i = 0; i < size; i++) {
      this.tableElements.push(i);
    }
  }

  findCommentaireBySujet(id:number){
    this.http.get<Array<Commentaire>>(this.urlComment+"sujetForum/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(comments=>{
      this.commentaires = comments;
    })
  }

  findCommentaireByUser(id:number){
    this.http.get<Array<Commentaire>>(this.urlComment+"user/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(comments=>{
      this.commentaires = comments;
    })
  }

  findCommentaireByCommentaire(id:number){
    this.http.get<Array<Commentaire>>(this.urlComment+"commentaire/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(comments=>{
      this.commentaires = comments;
    })
  }
  createCommentaire(comment:Commentaire):Observable<number>{
    return this.http.post<number>(this.urlComment,comment,{headers:this.authentificationService.getHeaders()});
  }

  updateCommentaire(comment:Commentaire):Observable<number>{
    return this.http.put<number>(this.urlComment,comment,{headers:this.authentificationService.getHeaders()});
    }
    removeCommentaire(id:number):Observable<number>{
        return this.http.delete<number>(this.urlComment+"id/"+id,{headers:this.authentificationService.getHeaders()});
    }


  get sujetForum(): SujetForum {
    if(this._sujetForum == null){
      this._sujetForum = new SujetForum();
    }
    return this._sujetForum;
  }

  set sujetForum(value: SujetForum) {
    this._sujetForum = value;
  }

  get sujetForums(): Array<SujetForum> {
    if(this._sujetForums == null){
      this._sujetForums = new Array<SujetForum>();
    }
    return this._sujetForums;
  }

  set sujetForums(value: Array<SujetForum>) {
    this._sujetForums = value;
  }

  get forumPage(): ForumPage {
    if(this._forumPage == null){
      this._forumPage = new ForumPage();
    }
    return this._forumPage;
  }

  set forumPage(value: ForumPage) {
    this._forumPage = value;
  }


  get commentaire(): Commentaire {
    if(this._commentaire == null){
      this._commentaire = new Commentaire();
    }
    return this._commentaire;
  }

  set commentaire(value: Commentaire) {
    this._commentaire = value;
  }

  get commentaires(): Array<Commentaire> {
    if(this._commentaires == null){
      this._commentaires = new Array<Commentaire>();
    }
    return this._commentaires;
  }

  set commentaires(value: Array<Commentaire>) {
    this._commentaires = value;
  }
  getReference(){
    const date = new Date();
    return "sujet"+date.getTime();
  }


  get userSujets(): Array<SujetForum> {
    if(this._userSujets == null){
      this._userSujets = new Array<SujetForum>();
    }
    return this._userSujets;
  }

  set userSujets(value: Array<SujetForum>) {
    this._userSujets = value;
  }
}
