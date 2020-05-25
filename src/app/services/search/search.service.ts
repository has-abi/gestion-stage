import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Stage} from "../../models/stage.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
   searchResult = [];
  url = "http://localhost:8091/gestion-stage-api/";
  constructor(private httpClient:HttpClient) { }
  searchOverStage(searchFor:string){
    console.log("yep service")
    this.httpClient.get<Array<Stage>>(this.url+"stage/search?search=sujet:*"+searchFor+"* OR organismeAccueil.raisonSociale:*"+searchFor
      +"* OR  organismeAccueil.adress:*"+searchFor+"* OR").subscribe(data=>{
        data.forEach(stage=>this.searchResult.push(stage))
      console.log(this.searchResult);
    });
  }

}
