import {Component, OnInit} from '@angular/core';
import {EncadreurService} from "../../../services/encadreur.service";
import {Encadreur} from "../../../models/encadreur.model";
import {User} from "../../../models/user.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {UserService} from "../../../services/user.service";
import {LocalStorageService} from "ngx-webstorage";
import {NotificationService} from "../../../services/notification.service";

declare let bootbox: any;

@Component({
  selector: 'app-list-encadreur',
  templateUrl: './list-encadreur.component.html',
  styleUrls: ['./list-encadreur.component.css']
})
export class ListEncadreurComponent implements OnInit {
  page = 0;
  typeEncadreur = "Tout"
  size = 10;
  sort = "asc";
  searchInput = "";
  searching = false;
  tableOrder = {
    order: "asc",
    prop: "id"
  }
  role = "";
  updateE

  constructor(private encadreurService: EncadreurService, private localStorage: LocalStorageService,
              private notificationService: NotificationService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.role = this.logedUser.roles[0].role;
    this.encadreurService.tableElements = [];
    this.chargerEncadreurs();
  }

  get logedUser(): User {
    return this.localStorage.retrieve("logedUser");
  }

  chargerEncadreurs() {

    if (this.role == "COORDINATEUR_ROLE") {
      this.findByCoordinateur();
    }
    if (this.role == "ADMIN_ROLE") {
      this.findAll();
    }
  }

  get pageEncadreurs() {
    return this.encadreurService.pageEncadreurs;
  }

  findByCoordinateur() {
    this.encadreurService.findByCoordinateur(this.logedUser.id, this.page, this.size, this.sort);
  }

  findAll() {
    this.encadreurService.findAll(this.page, this.size, this.sort);
  }

  findByType() {
    if (this.typeEncadreur != "Tout") {
      console.log(this.typeEncadreur)
      this.encadreurService.tableElements = [];
      this.encadreurService.findByType(this.page, this.size, this.typeEncadreur);
    }
  }

  nextElements() {
    if (this.page <= this.pageEncadreurs.totalPages) {
      this.page++;
      this.chargerEncadreurs();
      this.encadreurService.tableElements = [];
    }
  }

  prevElements() {
    if (this.page >= 0) {
      this.page--;
      this.chargerEncadreurs();
      this.encadreurService.tableElements = [];
    }
  }

  getIndexPage(i: number) {
    if (i <= this.pageEncadreurs.totalPages) {
      this.page = i;
      this.chargerEncadreurs();
      this.encadreurService.tableElements = [];
    }
  }

  get tableElements() {
    return this.encadreurService.tableElements;
  }

  resizePage() {
    this.chargerEncadreurs();
    this.encadreurService.tableElements = [];
  }

  search() {
    if (this.searchInput.length > 0) {
      this.searching = true;
      if (this.role == "COORDINATEUR_ROLE") {
        this.encadreurService.searchByCoord(this.searchInput, this.logedUser.id);
      }
      if (this.role == "ADMIN_ROLE") {
        this.encadreurService.search(this.searchInput);
      }
      this.pageEncadreurs.content = this.encadreurs;
    } else {
      this.chargerEncadreurs();
      this.encadreurService.tableElements = [];
      this.searching = false;
    }
  }

  get encadreurs() {
    return this.encadreurService.encadreurs;
  }

  changeOrder(order: string, prop: string) {
    if (order == "asc" && prop == "id") {
      this.encadreurService.tableElements = [];
      this.sort = "asc"
      this.chargerEncadreurs();
    }
    if (order == "desc" && prop == "id") {
      this.encadreurService.tableElements = [];
      this.sort = "desc"
      this.chargerEncadreurs();
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }

  delete = (encadreur: Encadreur) => {

    bootbox.confirm({
      message: "Vous voulez vraiment supprimer l'encadrant?",
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
          this.encadreurService.delete(encadreur.reference).subscribe(resp => {
            if (resp > 0) {
              this.notificationService.showSuccess("l'encadrant est supprimé avec succès!", "La liste des encadrants");
              this.encadreurs.splice(this.encadreurs.indexOf(encadreur), 1);
              this.pageEncadreurs.content.splice(this.pageEncadreurs.content.indexOf(encadreur), 1);
              this.chargerEncadreurs()
            } else {
              this.notificationService.showWarning("Erreur dans la suppression!", "La liste des encadrants");
            }
          }, error => {
            this.notificationService.showError("Erreur dans la suppression!", "La liste des encadrants");
          })
        }
      }
    })

  }

  updateEncadreur(encadreur: Encadreur) {
    this.updateE = true;
    this.userService.user = new User();
    this.userService.user = encadreur.user;
    this.encadreurService.encadreur = encadreur;
    encadreur.user = this.userService.user;

  }

}
