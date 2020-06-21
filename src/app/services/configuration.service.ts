import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Filiere} from "../models/filiere.model";
import {Role} from "../models/role.model";
import {OrganismePage} from "../models/pageModels/organisme-page.model";
import {OrganismeAccueil} from "../models/organisme-accueil.model";
import {Observable} from "rxjs";
import {Departement} from "../models/departement.model";
import {Ville} from "../models/ville.model";
import {Pays} from "../models/pays.model";
import {TypeServiceOrganisme} from "../models/type-service-organisme.model";
import {TypeOrganisme} from "../models/type-organisme.model";
import {Etablissement} from "../models/etablissement.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private _filieres:Array<Filiere>;
  private _departements:Array<Departement>;
  private roles:Array<Role>;
  private _organismePage:OrganismePage;
  private _organismes:Array<OrganismeAccueil>;
  organismeElements = [];
  private _etablisement:Etablissement;
  private organismeUrl = "http://localhost:8091/gestion-stage-api/organismeAccueil/"
  private depUrl = "http://localhost:8091/gestion-stage-api/departement/"
  private filUrl = "http://localhost:8091/gestion-stage-api/filiere/"
  private villeUrl = "http://localhost:8091/gestion-stage-api/ville/"
  private paysUrl = "http://localhost:8091/gestion-stage-api/pays/"
  private typeUrl = "http://localhost:8091/gestion-stage-api/typeOrganisme/"
  private serviceUrl = "http://localhost:8091/gestion-stage-api/typeServiceOrganisme/"
  private etabUrl ="http://localhost:8091/gestion-stage-api/etablissement/"
  constructor(private http:HttpClient,private authentificationService: AuthentificationService) { }
  findByVilleNom(ville:string,page:number,size:number){
    this.http.get<OrganismePage>(this.organismeUrl+"ville/"+ville+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this._organismePage = datas
      this.fillTableElements(datas.totalPages);
    })
  }
  findByType(type:string,page:number,size:number){
    this.http.get<OrganismePage>(this.organismeUrl+"type/"+type+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this._organismePage = datas
      this.fillTableElements(datas.totalPages);
    })
  }
  findByService(service:string,page:number,size:number){
    this.http.get<OrganismePage>(this.organismeUrl+"typeService/"+service+"/page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this._organismePage = datas
      this.fillTableElements(datas.totalPages);
    })
  }
  searchOrganisme(search:string):Observable<Array<OrganismeAccueil>>{
    const request = "search?search=raisonSociale:*"+search+"* OR responsable:*"+search+"* OR ville.nom:*"+search+"* OR typeOrganisme.type:*"
    +search+"* OR typeServiceOrganisme.type:*"+search;
    return  this.http.get<Array<OrganismeAccueil>>(this.organismeUrl+request,{headers:this.authentificationService.getHeaders()});
  }
  getAllFilieres(){
    this.http.get<Array<Filiere>>(this.filUrl,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.filieres = datas;
    })
  }

  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.organismeElements.push(i);
    }
  }
  getAllorganismes(page:number,size:number){
    this.http.get<OrganismePage>(this.organismeUrl+"page/"+page+"/size/"+size,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this._organismePage = datas
      this.fillTableElements(datas.totalPages);
    })
  }

  findDepartements(){
    this.http.get<Array<Departement>>(this.depUrl,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.departements = datas
    })
  }
  createVille(ville:Ville):Observable<number>{
    return this.http.post<number>(this.villeUrl,ville,{headers:this.authentificationService.getHeaders()});
  }
  createPays(pays:Pays):Observable<number>{
    return this.http.post<number>(this.paysUrl,pays,{headers:this.authentificationService.getHeaders()});
  }

  createFiliere(filiere:Filiere):Observable<number>{
    return this.http.post<number>(this.filUrl,filiere,{headers:this.authentificationService.getHeaders()});
  }
  createDep(dep:Departement):Observable<number>{
    return this.http.post<number>(this.depUrl,dep,{headers:this.authentificationService.getHeaders()});
  }

  createService(service:TypeServiceOrganisme):Observable<number>{
    return this.http.post<number>(this.serviceUrl,service,{headers:this.authentificationService.getHeaders()});
  }
  createType(type:TypeOrganisme):Observable<number>{
    return this.http.post<number>(this.typeUrl,type,{headers:this.authentificationService.getHeaders()});
  }

  updateVille(ville:Ville):Observable<number>{
    return this.http.put<number>(this.villeUrl,ville,{headers:this.authentificationService.getHeaders()});
  }
  updatePays(pays:Pays):Observable<number>{
    return this.http.put<number>(this.paysUrl,pays,{headers:this.authentificationService.getHeaders()});
  }

  updateFiliere(filiere:Filiere):Observable<number>{
    return this.http.put<number>(this.filUrl,filiere,{headers:this.authentificationService.getHeaders()});
  }
  updateDep(dep:Departement):Observable<number>{
    return this.http.put<number>(this.depUrl,dep,{headers:this.authentificationService.getHeaders()});
  }

  updateService(service:TypeServiceOrganisme):Observable<number>{
    return this.http.put<number>(this.serviceUrl,service,{headers:this.authentificationService.getHeaders()});
  }
  updateType(type:TypeOrganisme):Observable<number>{
    return this.http.put<number>(this.typeUrl,type,{headers:this.authentificationService.getHeaders()});
  }

  updateEtablissement():Observable<number>{
    return  this.http.put<number>(this.etabUrl,this.etablisement,{headers:this.authentificationService.getHeaders()});
  }
  getEtablissement(){
    this.http.get<Array<Etablissement>>(this.etabUrl,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.etablisement = datas[0];
    })
  }
  getRoles(){
    this.http.get<Array<Role>>("")
  }

  get filieres(): Array<Filiere> {
    if(this._filieres == null){
      this._filieres = new Array<Filiere>();
    }
    return this._filieres;
  }

  set filieres(value: Array<Filiere>) {
    this._filieres = value;
  }

  get organismePage(): OrganismePage {
    if(this._organismePage == null){
      this._organismePage = new OrganismePage();
    }
    return this._organismePage;
  }

  set organismePage(value: OrganismePage) {
    this._organismePage = value;
  }

  get organismes(): Array<OrganismeAccueil> {
    if(this._organismes == null){
      this._organismes = new Array<OrganismeAccueil>();
    }
    return this._organismes;
  }

  set organismes(value: Array<OrganismeAccueil>) {
    this._organismes = value;
  }

  get departements(): Array<Departement> {
    if(this._departements == null){
      this._departements = new Array<Departement>();
    }
    return this._departements;
  }

  set departements(value: Array<Departement>) {
    this._departements = value;
  }

  get etablisement(): Etablissement {
    if(this._etablisement == null){
      this.etablisement = new Etablissement();
    }
    return this._etablisement;
  }

  set etablisement(value: Etablissement) {
    this._etablisement = value;
  }
}
