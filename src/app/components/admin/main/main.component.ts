import { Component, OnInit } from '@angular/core';
import {EtudiantNavbarComponent} from "../../etudiant/etudiant-navbar/etudiant-navbar.component";
import {EtudiantService} from "../../../services/etudiant.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {JuryService} from "../../../services/jury.service";
import {StageService} from "../../../services/stage.service";
import {UserService} from "../../../services/user.service";
import {ForumService} from "../../../services/forum.service";
import {RapportService} from "../../../services/rapport.service";
import {NotificationService} from "../../../services/notification.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  search =false;
  nombreStages = 0;
  nombreEtudiants = 0;
  nombreEncadreurs = 0;
  nombreJuries = 0;
  nombreUsers = 0;
  nombreRepport = 0;
  nombreForum =0;
  constructor(private etudiantService:EtudiantService,private encadreurService:EncadreurService,private juryService:JuryService,
              private stageService:StageService,private userService:UserService, private forumService:ForumService,
              private rapportService:RapportService,private notificationService:NotificationService,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    if(this.localStorage.retrieve("firstLogin")){
      this.notificationService.showInfo("Bienvenu "+user.nom+" "+user.prenom+"!","Administration")
      this.localStorage.store("firstLogin",false);
    }
    this.countForums();
    this.countRapports();
    this.countStages();
    this.countUsers();
  }
  countUsers(){
    this.userService.countusers().subscribe(n=>this.nombreUsers = n);
  }
  countStages(){
    this.stageService.countStages().subscribe(n=>this.nombreStages = n)
  }
  countRapports(){
    this.rapportService.countRapport().subscribe(n=>this.nombreRepport = n)
  }
  countForums(){
    this.forumService.countForum().subscribe(n=>this.nombreForum = n)
  }



}
