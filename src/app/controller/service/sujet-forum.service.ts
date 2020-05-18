import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SujetForum} from "../../models/sujet-forum.model";

@Injectable({
  providedIn: 'root'
})

export class SujetForumService {
private _sujetForum:SujetForum;
private _listSujetForum: Array<SujetForum>;
private _listSujetPopular:Array<SujetForum>;


  get listSujetPopular(): Array<SujetForum> {
    if(this._listSujetPopular==null){
      this._listSujetPopular=new Array<SujetForum>();
    }
    return this._listSujetPopular;
  }

  set listSujetPopular(value: Array<SujetForum>) {
    this._listSujetPopular = value;
  }

  get listSujetForum(): Array<SujetForum> {
    if(this._listSujetForum==null){
      this._listSujetForum=new Array<SujetForum>();
    }
    return this._listSujetForum;
  }

  set listSujetForum(value: Array<SujetForum>) {
    this._listSujetForum = value;
  }

  get sujetForum(): SujetForum {
    if(this._sujetForum==null){
      this._sujetForum=new SujetForum();
    }
    return this._sujetForum;
  }

  set sujetForum(value: SujetForum) {
    this._sujetForum = value;
  }

  constructor(private  http : HttpClient) { }
}
