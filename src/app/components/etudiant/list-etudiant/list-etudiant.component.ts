import {Component, OnInit} from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {UserService} from "../../../services/user.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Etudiant} from "../../../models/etudiant.model";
import {User} from "../../../models/user.model";
import {LocalStorageService} from "ngx-webstorage";
import {NotificationService} from "../../../services/notification.service";

declare let bootbox: any;

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit {
  page = 0;
  size = 10;
  id = 1;
  sort = "asc";
  searchInput = "";
  searching = false;
  tableOrder = {
    order: "asc",
    prop: "id"
  }
  role = "";
  updateE = false;

  constructor(private etudiantService: EtudiantService, private localStorage: LocalStorageService, private userService: UserService,
              private notificationService:NotificationService) {
  }

  ngOnInit(): void {
    this.role = this.logedUser.roles[0].role;
    this.etudiantService.tableElements = [];
    this.chargerEtudiants();
  }

  findAll() {
    this.etudiantService.findAll(this.page, this.size, this.sort);
  }

  chargerEtudiants() {

    if (this.role == "COORDINATEUR_ROLE") {
      this.findByCoordinateur();
    }
    if (this.role == "ADMIN_ROLE") {
      this.findAll();
    }
    if(this.role == "ENCADREUR_ROLE"){
      this.findByEncadreur();
    }
  }
  findByEncadreur(){
    return this.etudiantService.findByEncadreur(this.logedUser.id);
  }
  get pageEtudiant() {
    return this.etudiantService.pageEtudiant;
  }

  findByCoordinateur() {
    this.etudiantService.findByCoordinateur(this.logedUser.id, this.page, this.size, this.sort);
  }

  nextElements() {
    if (this.page <= this.pageEtudiant.totalPages) {
      this.page++;
      this.chargerEtudiants();
      this.etudiantService.tableElements = [];
    }
  }

  prevElements() {
    if (this.page >= 0) {
      this.page--;
      this.chargerEtudiants();
      this.etudiantService.tableElements = [];
    }
  }

  getIndexPage(i: number) {
    if (i <= this.pageEtudiant.totalPages) {
      this.page = i;
      this.chargerEtudiants();
      this.etudiantService.tableElements = [];
    }
  }

  get tableElements() {
    return this.etudiantService.tableElements;
  }

  resizePage() {
    this.chargerEtudiants();
    this.etudiantService.tableElements = [];
  }

  get logedUser(): User {
    return this.localStorage.retrieve("logedUser");
  }

  search() {
    if (this.searchInput.length > 0) {
      this.searching = true;
      if (this.role == "COORDINATEUR_ROLE") {
        this.etudiantService.searchByCoord(this.searchInput, this.logedUser.id);
      }
      if (this.role == "ENCADREUR_ROLE") {
        this.etudiantService.searchByEncad(this.searchInput, this.logedUser.id);
      }
      if (this.role == "ADMIN_ROLE") {
        this.etudiantService.search(this.searchInput);
      }
      this.pageEtudiant.content = this.etudiants;
    } else {
      this.etudiantService.tableElements = [];
      this.chargerEtudiants();
      this.searching = false;
    }
  }

  get etudiants() {
    return this.etudiantService.etudiants;
  }

  changeOrder(order: string, prop: string) {
    if (order == "asc" && prop == "id") {
      this.etudiantService.tableElements = [];
      this.sort = "asc"
      this.chargerEtudiants();
    }
    if (order == "desc" && prop == "id") {
      this.etudiantService.tableElements = [];
      this.sort = "desc"
      this.chargerEtudiants();
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }

  delete = (etudiant: Etudiant) => {
    bootbox.confirm({
      message: "Vous voulez vraiment supprimer l'encadreur?",
      buttons: {
        confirm: {
          label: 'Confirmer <i class="fa fa-check"></i>',
          className: 'btn-success'
        },
        cancel: {
          label: 'Annuler <i class="fa fa-times"></i>',
          className: 'btn-danger'
        }
      },
      callback: (result) => {
        if (result) {
          this.etudiantService.removeByCne(etudiant.cin).subscribe(resp => {
            if (resp > 0) {
              this.notificationService.showSuccess("l'étudiant est  supprimé avec succès!", "La liste des étudiants");
              this.pageEtudiant.content.splice(this.pageEtudiant.content.indexOf(etudiant), 1);
              this.etudiants.splice(this.etudiants.indexOf(etudiant), 1);
              this.etudiantService.tableElements = [];
              this.chargerEtudiants();
            } else {
              this.notificationService.showWarning("Erreur dans la suppression!", "La liste des étudiants");
            }
          },error => {
            this.notificationService.showError("Erreur dans la suppression!", "La liste des étudiants");
          })
        }
      }
    })
  }

  updateEtudiant(etudiant: Etudiant) {
    this.updateE = true;
    this.userService.user = new User();
    this.userService.user = etudiant.user;
    this.etudiantService.etudiant = etudiant;
  }
}
