import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private _cols:string ;
  constructor() { }

  get cols(): string {
    if(this._cols == null){
      this._cols ="col-md-12"
    }
    return this._cols;
  }

  set cols(value: string) {
    this._cols = value;
  }
}
