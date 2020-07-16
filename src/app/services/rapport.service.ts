import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Rapport} from "../models/rapport.model";
import {RapportPage} from "../models/pageModels/rapport-page.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  url="http://localhost:8091/gestion-stage-api/rapport/";
  urlRapportTache = "http://localhost:8091/gestion-stage-api/rapportTache/"
  private _stageRef:string;
  private _rapport:Rapport;
  private _rapports:Array<Rapport>;
  private _rapportPage:RapportPage;
  private _fileIsSelected = false;
  private _tacheRef:string;
  tableElements = [];
  constructor(private http:HttpClient,private authentificationService:AuthentificationService) { }

   save(file: File,titre:string,desc:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    formData.append('desc', desc);
    if(this.stageRef.length>0){
      formData.append('ref', this.stageRef);
      const req = new HttpRequest('POST', this.url, formData, {
        reportProgress: true,
        responseType: 'json',
        headers:this.authentificationService.getHeaders()
      });
      return this.http.request(req);
    }
     if(this.tacheRef.length>0){
       formData.append('ref', this.tacheRef);
       const req = new HttpRequest('POST', this.urlRapportTache+"save", formData, {
         reportProgress: true,
         responseType: 'json',
         headers:this.authentificationService.getHeaders()
       });
       return this.http.request(req);
     }
  }
  getRapport(ref:string){
    this.http.get("http://localhost:8091/files/"+ref,{headers:this.authentificationService.getHeaders(), responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'rapport');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      })
  }
  diplayRapport(ref:string){
    this.http.get("http://localhost:8091/file/display/"+ref,{headers:this.authentificationService.getHeaders(), responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'rapport');
        downloadLink.setAttribute('target', '_blank');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      })
  }
  update(file: File,titre:string,desc:string,ref:string): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    formData.append('desc', desc);
    if(this.stageRef.length>0){
      formData.append('ref', ref);
      const req = new HttpRequest('PUT', this.url, formData, {
        reportProgress: true,
        responseType: 'json',
        headers:this.authentificationService.getHeaders()
      });
      return this.http.request(req);
    }
    if(this.tacheRef.length>0){
      formData.append('ref', ref);
      const req = new HttpRequest('PUT', this.urlRapportTache+"update", formData, {
        reportProgress: true,
        responseType: 'json',
        headers:this.authentificationService.getHeaders()
      });
      return this.http.request(req);
    }
  }
  findAllRapports(page:number,size:number,sort:string){
    this.http.get<RapportPage>(this.url+"page/"+page+"/size/"+size+"/sort/"+sort,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.rapportPage = data;
      this.fillTableElements(data.totalPages);
    })
  }
  search(search:string){
    this.http.get<Array<Rapport>>(this.url+"search?search=document.titre:*"+search+"* OR descreption:*"+search+"* localeSoutenance:*"+search,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.rapports = data;
    })
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tableElements.push(i);
    }
  }
  countRapport():Observable<number>{
    return this.http.get<number>(this.url+"count",{headers:this.authentificationService.getHeaders()});
  }
  validerRapport():Observable<number> {
    return this.http.put<number>(this.url + "reference", this.rapport.reference, {headers: this.authentificationService.getHeaders()});
  }


  delete(r:Rapport):Observable<number>{
    return this.http.delete<number>(this.url+"ref/"+r.reference,{headers:this.authentificationService.getHeaders()})
  }

  get tacheRef(): string {
    if(this._tacheRef == null){
      this._tacheRef = "";
    }
    return this._tacheRef;
  }

  set tacheRef(value: string) {
    this._tacheRef = value;
  }

  get stageRef(): string {
    if(this._stageRef ==  null){
      this._stageRef = "";
    }
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
