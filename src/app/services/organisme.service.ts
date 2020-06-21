import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrganismeAccueil} from "../models/organisme-accueil.model";
import {TypeOrganisme} from "../models/type-organisme.model";
import {TypeServiceOrganisme} from "../models/type-service-organisme.model";
import {Ville} from "../models/ville.model";
import {Pays} from "../models/pays.model";
import {Observable} from "rxjs";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class OrganismeService {
  private _organismeAcceuil:OrganismeAccueil;
  private _organismeAcceuils:Array<OrganismeAccueil>;
  private _typeOrganismes:Array<TypeOrganisme>;
  private _typeServiceOrganismes:Array<TypeServiceOrganisme>;
  private _villes:Array<Ville>;
  private _pays:Array<Pays>;
  url="http://localhost:8091/gestion-stage-api/"
  constructor(private httpClient:HttpClient,private authentificationService:AuthentificationService) { }

    findByFiliere(id:number){
    this.httpClient.get<Array<OrganismeAccueil>>(this.url+"organismeAccueil/filiere/id/"+id,{headers:this.authentificationService.getHeaders()}).subscribe(orgs=>{
      this.organismeAcceuils = orgs;
    })
    }

    createOrganisme():Observable<number>{
    return this.httpClient.post<number>(this.url+"organismeAccueil/",this.organismeAcceuil,{headers:this.authentificationService.getHeaders()});
    }

    updateOrganisme():Observable<number>{
      return this.httpClient.put<number>(this.url+"organismeAccueil/",this.organismeAcceuil,{headers:this.authentificationService.getHeaders()});
    }
    deleteOrganisme(id:number):Observable<number>{
      return this.httpClient.delete<number>(this.url+"organismeAccueil/id/"+id,{headers:this.authentificationService.getHeaders()});
    }

  findAll(){
      this.httpClient.get<Array<OrganismeAccueil>>(this.url+"organismeAccueil/",{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
        this.organismeAcceuils = data
      })
  }
  findAllTypeOrganisme(){
    this.httpClient.get<Array<TypeOrganisme>>(this.url+"typeOrganisme/",{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.typeOrganismes = data
    })
  }
  findAllTypeServiceOrganisme(){
    this.httpClient.get<Array<TypeServiceOrganisme>>(this.url+"typeServiceOrganisme/",{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.typeServiceOrganismes = data
    })
  }
  findAllVille(){
    this.httpClient.get<Array<Ville>>(this.url+"ville/",{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.villes = data
    })
  }
  findAllPays(){
    this.httpClient.get<Array<Pays>>(this.url+"pays/",{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.pays = data
    })
  }
  findVillesByPaysNom(nom){
    this.httpClient.get<Array<Ville>>(this.url+"ville/pays/"+nom,{headers:this.authentificationService.getHeaders()}).subscribe(data=>{
      this.villes = data
    })
  }
  get organismeAcceuil(): OrganismeAccueil {
    if(this._organismeAcceuil == null){
      this._organismeAcceuil = new OrganismeAccueil();
    }
    return this._organismeAcceuil;
  }

  set organismeAcceuil(value: OrganismeAccueil) {
    this._organismeAcceuil = value;
  }

  get organismeAcceuils(): Array<OrganismeAccueil> {
    if(this._organismeAcceuils == null){
      this.organismeAcceuils = new Array<OrganismeAccueil>();
    }
    return this._organismeAcceuils;
  }

  set organismeAcceuils(value: Array<OrganismeAccueil>) {
    this._organismeAcceuils = value;
  }

  get typeOrganismes(): Array<TypeOrganisme> {
    if(this._typeOrganismes == null){
      this._typeOrganismes = new Array<TypeOrganisme>();
    }
    return this._typeOrganismes;
  }

  set typeOrganismes(value: Array<TypeOrganisme>) {
    this._typeOrganismes = value;
  }

  get typeServiceOrganismes(): Array<TypeServiceOrganisme> {
    if(this._typeServiceOrganismes == null){
      this._typeServiceOrganismes = new Array<TypeServiceOrganisme>();
    }
    return this._typeServiceOrganismes;
  }

  set typeServiceOrganismes(value: Array<TypeServiceOrganisme>) {
    this._typeServiceOrganismes = value;
  }

  get villes(): Array<Ville> {
    if(this._villes == null){
      this.villes = new Array<Ville>();
    }
    return this._villes;
  }

  set villes(value: Array<Ville>) {
    this._villes = value;
  }

  get pays(): Array<Pays> {
    if(this._pays == null){
      this._pays = new Array<Pays>();
    }
    return this._pays;
  }

  set pays(value: Array<Pays>) {
    this._pays = value;
  }
}
