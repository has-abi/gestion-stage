import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../../services/notification.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-coordinateur',
  templateUrl: './coordinateur.component.html',
  styleUrls: ['./coordinateur.component.css']
})
export class CoordinateurComponent implements OnInit {

  constructor(private notificationService:NotificationService,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    if(this.localStorage.retrieve("firstLogin")){
      this.notificationService.showInfo("Bienvenu sur l'application de gestion et de suivi des stages",user.nom+" "+user.prenom);
      this.localStorage.store("firstLogin",false);
    }

  }



}
