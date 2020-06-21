import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {StageService} from "../../../services/stage.service";
import {Stage} from "../../../models/stage.model";
import {Encadreur} from "../../../models/encadreur.model";
import {TacheService} from "../../../services/tache.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-etudiant-navbar',
  templateUrl: './etudiant-navbar.component.html',
  styleUrls: ['./etudiant-navbar.component.css']
})
export class EtudiantNavbarComponent implements OnInit {
  picture= "";
  constructor(private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.profilePic();
    console.log(this.picture);
  }
  profilePic(){
    const user = this.localStorage.retrieve("logedUser");
    if(user.photo != null){
      this.picture = 'http://localhost:8091/gestion-stage-api/user/image/'+user.photo;
    }else{
      this.picture = '../../../../assets/unnamed.png';
    }
  }
}
