import {Injectable} from '@angular/core';
import {Coordinateur} from "../models/coordinateur.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CoordinateurPage} from "../models/pageModels/coordinateur-page.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class CoordinateurService {
  url = "http://localhost:8091/gestion-stage-api/coordinateur/";
  private _coordinateur: Coordinateur;
  private _coordinatuers: Array<Coordinateur>;
  private _coordinateurPage: CoordinateurPage;
  tableElements = [];

  constructor(private httpClient: HttpClient,private authentificationService:AuthentificationService) {
  }
  findByUserId(id:number):Observable<Coordinateur>{

    return this.httpClient.get<Coordinateur>(this.url+"user/id/"+id,{headers:this.authentificationService.getHeaders()});
  }
  chargerPv(id:number){
 	this.httpClient.get("http://localhost:8091/pv/coordinateur/id/"+id,{headers:this.authentificationService.getHeaders(), responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            downloadLink.setAttribute('download', 'pv_2019_2020');
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
	//console.log(this.authentificationService.getHeaders())
    //this.httpClient.get("http://localhost:8091/pv/coordinateur/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe();
  }
  update(coordinateur:Coordinateur):Observable<number>{
    return  this.httpClient.put<number>(this.url,coordinateur,{headers:this.authentificationService.getHeaders()});
  }
  delete(reference:string):Observable<number>{
    return this.httpClient.delete<number>(this.url+"reference/"+reference,{headers:this.authentificationService.getHeaders()});
  }
  getCoordinateur() {
    this.httpClient.get<Coordinateur>(this.url + "reference/cord7485",{headers:this.authentificationService.getHeaders()}).subscribe(c => {
      this.coordinateur = c;
    })
  }

  findAll(page: number, size: number, sort: string) {
    this.httpClient.get<CoordinateurPage>(this.url + "page/" + page + "/size/" + size,{headers:this.authentificationService.getHeaders()}).subscribe(datas => {
      this.coordinateurPage = datas;
      this.fillTableElements(datas.totalPages);
    })
  }

  fillTableElements(size: number) {
    for (let i = 0; i < size; i++) {
      this.tableElements.push(i);
    }
  }

  search(search: string) {
    const request = "search?search=user.nom:*" + search + "* OR user.prenom:*" + search + "* OR user.username:*" + search + "* OR " +
      "reference:*" + search + "* OR user.sexe:*" + search + "* OR user.adress:*" + search;
    this.httpClient.get<Array<Coordinateur>>(this.url + request,{headers:this.authentificationService.getHeaders()}).subscribe(datas => {
      this.coordinatuers = datas
    })
  }

  createCoordinateur(coordinateur: Coordinateur): Observable<number> {
	  console.log(coordinateur)
    return this.httpClient.post<number>(this.url, coordinateur,{headers:this.authentificationService.getHeaders()});
  }

  get coordinateurPage(): CoordinateurPage {
    if (this._coordinateurPage == null) {
      this._coordinateurPage == new CoordinateurPage();
    }
    return this._coordinateurPage;
  }

  set coordinateurPage(value: CoordinateurPage) {
    this._coordinateurPage = value;
  }

  get coordinateur(): Coordinateur {
    if (this._coordinateur == null) {
      this._coordinateur = new Coordinateur();
    }
    return this._coordinateur;
  }

  set coordinateur(value: Coordinateur) {
    this._coordinateur = value;
  }

  get coordinatuers(): Array<Coordinateur> {
    if (this._coordinatuers == null) {
      this._coordinatuers = new Array<Coordinateur>();
    }
    return this._coordinatuers;
  }

  set coordinatuers(value: Array<Coordinateur>) {
    this._coordinatuers = value;
  }
}
