import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Covid} from "../models/covid.module";

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  url = "https://api.covid19api.com/summary"
  private _covid:Covid;
  constructor(private http:HttpClient) { }

  getAll(){
    this.http.get<Covid>(this.url).subscribe(datas=>{
      this.covid.Global = datas.Global;
      this.covid.Date = datas.Date;
      this.covid.Countries = datas.Countries
      console.log(this.covid)
    })
  }

  get covid(): Covid {
    if(this._covid == null){
      this._covid = new Covid();
    }
    return this._covid;
  }

  set covid(value: Covid) {
    this._covid = value;
  }
}
