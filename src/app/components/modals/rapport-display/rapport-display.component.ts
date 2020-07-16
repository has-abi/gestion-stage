import { Component, OnInit } from '@angular/core';
import {RapportService} from "../../../services/rapport.service";
import {LocalStorageService} from "ngx-webstorage";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-rapport-display',
  templateUrl: './rapport-display.component.html',
  styleUrls: ['./rapport-display.component.css']
})
export class RapportDisplayComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  modifierRapport = false;
  role = "";
  constructor(private rapportService:RapportService,private sessionStorage:LocalStorageService,private notificationService:NotificationService) { }

  ngOnInit(): void {
    const user = this.sessionStorage.retrieve("logedUser");
    this.role = user.roles[0].role;
  }
  get rapport(){
    return this.rapportService.rapport;
  }
  valider(){
    return this.rapportService.validerRapport().subscribe(resp=>{
      if(resp>0){
        this.notificationService.showSuccess("Le rapport est validé avec succès!","Rapports des stages")
      }else {
        this.notificationService.showWarning("Erreur dans la validation du rapport!","Rapports des stages")
      }
    },error => {
      this.notificationService.showError("Erreur est survenu","Rapports des stages")
    });

  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  display(){
    this.rapportService.diplayRapport(this.rapport.document.reference)
  }
  download(){
    this.rapportService.getRapport(this.rapport.document.reference)
  }

}
