import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Rapport} from "../models/rapport.model";
import {RapportPage} from "../models/pageModels/rapport-page.model";

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  url="http://localhost:8091/gestion-stage-api/rapport/";
  private _stageRef:string;
  private _rapport:Rapport;
  private _rapports:Array<Rapport>;
  private _rapportPage:RapportPage;
  private _fileIsSelected = false;
  tableElements = [];
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
  findAllRapports(page:number,size:number,sort:string){
    this.http.get<RapportPage>(this.url+"page/"+page+"/size/"+size+"/sort/"+sort).subscribe(data=>{
      this.rapportPage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  search(search:string){
    this.http.get<Array<Rapport>>(this.url+"search?search=document.titre:*"+search+"* OR descreption:*"+search+"* localeSoutenance:*"+search).subscribe(data=>{
      this.rapports = data;
    })
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tableElements.push(i);
    }
  }
  countRapport():Observable<number>{
    return this.http.get<number>(this.url+"count");
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

  get rapportPage(): RapportPage {
    if(this._rapportPage == null){
      this._rapportPage = new RapportPage();
    }
    return this._rapportPage;
  }

  set rapportPage(value: RapportPage) {
    this._rapportPage = value;
  }

  get rapports(): Array<Rapport> {
    if(this._rapports == null){
      this._rapports = new Array<Rapport>();
    }
    return this._rapports;
  }

  set rapports(value: Array<Rapport>) {
    this._rapports = value;
  }
}
