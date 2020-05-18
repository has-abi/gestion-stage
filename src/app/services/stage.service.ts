import { Injectable } from '@angular/core';
import {Stage} from "../models/stage.model";

import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private _stage:Stage;
  private _stages:Array<Stage>;

  url="http://localhost:8093/gestion-stage-api/stage/"
  constructor(private httpClient:HttpClient) { }
  save(){
    this.stage.reference = this.getReference();
    console.log(this.stage)
    this.httpClient.post<number>(this.url,this.stage).subscribe(reponse=>{
      if(reponse>0){
        console.log(reponse);
      }
    })
  }
  getAllStages(){
    return this.httpClient.get<Array<Stage>>(this.url).subscribe(data=>{
          this.stages = data
      console.log(this.stages);
    })
  }
  get stage(): Stage {
    if(this._stage == null){
      this._stage = new Stage();
    }
      return this._stage;
  }

  set stage(value: Stage) {
    this._stage = value;
  }


  get stages(): Array<Stage> {
    if(this._stages ==  null){
      this._stages = new Array<Stage>();
    }
    return this._stages;
  }

  set stages(value: Array<Stage>) {
    this._stages = value;
  }

  getReference(){
    const date = new Date();
    return "stage"+date.getTime();
  }
}
