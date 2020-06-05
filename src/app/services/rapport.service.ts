import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Rapport} from "../models/rapport.model";

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  url="http://localhost:8091/gestion-stage-api/rapport/";
  private _stageRef:string;
  private _rapport:Rapport;
  private _fileIsSelected = false;
  constructor(private http:HttpClient) { }
   save(file: File,titre:string,desc:string): Observable<HttpEvent<any>> {
     console.log("inside save")
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    formData.append('desc', desc);
    formData.append('stageRef', this.stageRef);
     console.log(formData)
     console.log(this.stageRef)
    const req = new HttpRequest('POST', this.url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  validerRapport(){
    this.http.put(this.url+"reference",this.rapport.reference).subscribe(resp=>{
      if(resp>0){
        this.rapport.valider = true;
      }
    })
    return this.rapport;
  }

  get stageRef(): string {
    return this._stageRef;
  }

  set stageRef(value: string) {
    this._stageRef = value;
  }

  get rapport(): Rapport {
    if(this._rapport == null){
      this._rapport = new Rapport();
    }
    return this._rapport;
  }

  set rapport(value: Rapport) {
    this._rapport = value;
  }


  get fileIsSelected(): boolean {
    return this._fileIsSelected;
  }

  set fileIsSelected(value: boolean) {
    this._fileIsSelected = value;
  }
}
