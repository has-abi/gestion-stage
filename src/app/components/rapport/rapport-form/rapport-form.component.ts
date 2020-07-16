import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {RapportService} from "../../../services/rapport.service";
import {StageService} from "../../../services/stage.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {TacheService} from "../../../services/tache.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-rapport-form',
  templateUrl: './rapport-form.component.html',
  styleUrls: ['./rapport-form.component.css']
})
export class RapportFormComponent implements OnInit {
  selectedFile: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  id;

  fileInfos: Observable<any>;
  rapportForm;

  constructor(private rapportService: RapportService, private formBuilder: FormBuilder, private stageService: StageService, private localStorage: LocalStorageService,
              private tacheService: TacheService,private notificationService:NotificationService) {
  }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    this.id = user.id;
    this.rapportForm = this.formBuilder.group({
      titre: new FormControl('', [
        Validators.required
      ]),
      desc: new FormControl('', [
        Validators.required
      ])
    })
  }

  upload(rapportData) {
    if (this.titre.errors == null && this.desc.errors == null) {
      this.progress = 0;
      this.currentFile = this.selectedFile.item(0);
      this.rapportService.save(this.currentFile, rapportData.titre, rapportData.desc).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.notificationService.showSuccess("Le rapport est archivé avec succès","L'archivage du rapport")
            this.stageService.tableElements = [];
            this.stageService.findByCoordinateurId(this.id, 0, 10, "asc");

            const logedUser = this.localStorage.retrieve("logedUser");
            this.stageService.etudiantActiveStages(logedUser.id).subscribe(s => {
              this.stageService.stage = s
              this.tacheService.findByStageRef(s.reference).subscribe(data => {
                this.tacheService.taches = data;
              })
            });
          }
        },
        err => {
          this.notificationService.showError("Erreur est survenu!","L'archivage du rapport");
          this.progress = 0;
          this.currentFile = undefined;
        });

      this.selectedFile = undefined;
    }
  }

  selectFile(event) {
    this.selectedFile = event.target.files;
    this.rapportService.fileIsSelected = true;
  }

  get titre() {
    return this.rapportForm.get('titre');
  }

  get file() {
    return this.rapportForm.get('file');
  }

  get desc() {
    return this.rapportForm.get('desc');
  }


}
