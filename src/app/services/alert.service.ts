import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _action:boolean;
  private _message:string;
  constructor() { }

  get action(): boolean {
    if(!this._action){
      this._action = false;
    }
    return this._action;
  }

  set action(value: boolean) {
    this._action = value;
  }

  get message(): string {
    if(!this._message){
      this._message = "";
    }
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
