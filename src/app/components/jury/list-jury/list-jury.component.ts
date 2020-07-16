import {Component, OnInit} from '@angular/core';
import {JuryService} from "../../../services/jury.service";
import {LocalStorageService} from "ngx-webstorage";
import {MembreJury} from "../../../models/membre-jury.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {User} from "../../../models/user.model";
import {NotificationService} from "../../../services/notification.service";
import {UserService} from "../../../services/user.service";

declare let bootbox: any;

@Component({
  selector: 'app-list-jury',
  templateUrl: './list-jury.component.html',
  styleUrls: ['./list-jury.component.css']
})
export class ListJuryComponent implements OnInit {
  page = 0;
  size = 10;
  sort = "asc";
  searchInput = "";
  searching = false;
  tableOrder = {
    order: "asc",
    prop: "id"
  }
  role;
  updateJ = false;

  constructor(private juryService: JuryService, private localStorage: LocalStorageService, private notificationService:NotificationService,
              private userService:UserService) {
  }

  ngOnInit(): void {
    this.role = this.logedUser.roles[0].role;
    this.findByCoordinateur();
  }

  findByCoordinateur() {
    this.juryService.findByCoordinateur(this.logedUser.id, this.page, this.size, this.sort);
  }

  chargerJuries() {
    if (this.role == "COORDINATEUR_ROLE") {
      this.findByCoordinateur();
    }
    if (this.role == "ADMIN_ROLE") {
      this.findAll();
    }
  }

  get logedUser(): User {
    return this.localStorage.retrieve("logedUser");
  }

  findAll() {
    return this.juryService.findAll(this.page, this.size, this.sort);
  }

  nextElements() {
    if (this.page <= this.pageJury.totalPages) {
      this.page++;
      this.chargerJuries();
      this.juryService.tableElements = [];
    }
  }

  prevElements() {
    if (this.page >= 0) {
      this.page--;
      this.chargerJuries();
      this.juryService.tableElements = [];
    }
  }

  getIndexPage(i: number) {
    if (i <= this.pageJury.totalPages) {
      this.page = i;
      this.chargerJuries();
      this.juryService.tableElements = [];
    }
  }

  get tableElements() {
    return this.juryService.tableElements;
  }

  resizePage() {
    this.chargerJuries();
    this.juryService.tableElements = [];
  }

  search() {
    if (this.searchInput.length > 0) {
      this.searching = true;
      this.juryService.search(this.searchInput);
      this.pageJury.content = this.juries;
    } else {
      this.chargerJuries();
      this.juryService.tableElements = [];
      this.searching = false;
    }
  }

  get pageJury() {
    return this.juryService.pagejury;
  }

  get juries() {
    return this.juryService.juries;
  }

  changeOrder(order: string, prop: string) {
    if (order == "asc" && prop == "id") {
      this.chargerJuries();
    }
    if (order == "desc" && prop == "id") {
      this.chargerJuries();
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }

  delete = (jury: MembreJury) => {

    bootbox.confirm({
      message: "Vous voulez vraiment supprimer ce membre de jury?",
      buttons: {
        confirm: {
          label: 'Confirmer <i class="fa fa-check"></i>',
          className: 'btn-success'
        },
        cancel: {
          label: 'Annuler <i class="fa fa-times"></i> ',
          className: 'btn-danger'
        }
      },
      callback: (result) => {
        if (result) {
          this.juryService.delete(jury.reference).subscribe(resp => {
            if (resp > 0) {
              this.notificationService.showSuccess("Le membre de jury est supprimé avec succès!", "La liste des membres de jurys");
              this.juries.splice(this.juries.indexOf(jury), 1);
              this.pageJury.content.splice(this.pageJury.content.indexOf(jury), 1);
              this.chargerJuries()
            } else {
              this.notificationService.showWarning("Erreur dans la suppression!", "La liste des membres de jurys");
            }
          }, error => {
            this.notificationService.showError("Erreur est survenu!","La liste des membres de jurys");
          })
        }
      }
    })

  }

  update(jury:MembreJury){
    this.updateJ = true;
    this.userService.user = new User();
    this.userService.user = jury.user;
    this.juryService.jury =  jury;
    jury.user = this.userService.user;

  }
}
