import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-encadreur',
  templateUrl: './encadreur.component.html',
  styleUrls: ['./encadreur.component.css']
})
export class EncadreurComponent implements OnInit {

  constructor(private localStorage:LocalStorageService,private notificationService:NotificationService) { }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    if(this.localStorage.retrieve("firstLogin")){
      this.notificationService.showInfo("Bienvenu sur l'application de gestion et de suivi des stages",user.nom+" "+user.prenom);
      this.localStorage.store("firstLogin",false);
    }
  }

}
