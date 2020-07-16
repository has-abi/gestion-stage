import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent implements OnInit {

  constructor(private notificationService: NotificationService, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    if (this.localStorage.retrieve("firstLogin")) {
      this.notificationService.showInfo("Bienvenu sur l'application de gestion et de suivi des stages", user.nom + " " + user.prenom);
      this.localStorage.store("firstLogin", false);
    }

  }

}
