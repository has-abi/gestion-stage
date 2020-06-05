import { Injectable } from '@angular/core';
import {Convention} from "../models/convention.model";

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private _convention:Convention;
  constructor() { }

  get convention(): Convention {
    if(this._convention ==  null){
      this._convention = new Convention();
    }
    return this._convention;
  }

  set convention(value: Convention) {
    this._convention = value;
  }
}
