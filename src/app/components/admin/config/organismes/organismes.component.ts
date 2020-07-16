import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {OrganismeService} from "../../../../services/organisme.service";
import {OrganismeAccueil} from "../../../../models/organisme-accueil.model";
import {Ville} from "../../../../models/ville.model";
import {Pays} from "../../../../models/pays.model";
import {TypeOrganisme} from "../../../../models/type-organisme.model";
import {TypeServiceOrganisme} from "../../../../models/type-service-organisme.model";
import {LocalStorageService} from "ngx-webstorage";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-organismes',
  templateUrl: './organismes.component.html',
  styleUrls: ['./organismes.component.css']
})
export class OrganismesComponent implements OnInit {
  page = 0;
  size = 5;
  id = 1;
  sort = "asc";
  searchInput = "";
  searching = false;
  tableOrder = {
    order: "asc",
    prop: "id"
  }
  updateOrganisme = false;
  ajouterOrganisme = false;
  role = "";

  constructor(private configurationService: ConfigurationService, private organismeService: OrganismeService,
              private notificationService: NotificationService, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    this.role = user.roles[0].role;
    this.organismeService.findAllVille();
    this.organismeService.findAllTypeServiceOrganisme();
    this.organismeService.findAllTypeOrganisme();
    this.organismeService.findAllPays();
    this.findAll();
    this.initOrganisme();
  }

  search() {
    if (this.searchInput.length == 0) {
      this.searching = false;
      this.configurationService.organismeElements = [];
      this.findAll();
    } else {
      this.searching = true;
      this.configurationService.searchOrganisme(this.searchInput).subscribe(datas => {
        this.pageOrganisme.content = datas;
      });
    }
  }

  update(organisme: OrganismeAccueil) {
    this.organismeService.organismeAcceuil = organisme;
    this.updateOrganisme = true;
  }

  updateStructure() {
    this.organismeService.updateOrganisme().subscribe(resp => {
      if (resp > 0) {
        this.notificationService.showSuccess("Organisme Modifier avec succès!", "La structure d'accueil");
        this.updateOrganisme = false;
      } else {
        this.notificationService.showWarning("Erreur dans la modification de l'organisme!", "La structure d'accueil");
      }
    }, error => {
      this.notificationService.showError("Erreur est survenu", "La structure d'accueil")
    })
  }

  createOrganisme() {
    this.organismeService.createOrganisme().subscribe(resp => {
      if (resp > 0) {
        this.notificationService.showSuccess("l'Organisme est  ajouté avec succès!", "La structure d'accueil");
        this.pageOrganisme.content.push(this.organismeAccueil);
        this.organismeService.organismeAcceuil = new OrganismeAccueil();
        this.initOrganisme();
      } else {
        this.notificationService.showWarning("Erreur dans la création de l'organisme!", "La structure d'accueil");
      }
    }, error => {
      this.notificationService.showError("Erreur est survenu", "La structure d'accueil")
    })
  }

  get pays() {
    return this.organismeService.pays;
  }

  changeOrganisme() {
    if (this.organismeAccueil.id) {
      this.updateStructure();
    } else {
      this.createOrganisme();
    }
  }

  validateOrganisme() {
    return this.organismeAccueil.raisonSociale.length == 0 || this.organismeAccueil.adress.length == 0 || this.organismeAccueil.email.length == 0 ||
      this.organismeAccueil.tele.length == 0 || this.organismeAccueil.teleFix.length == 0 || this.organismeAccueil.responsable.length == 0 ||
      this.organismeAccueil.typeOrganisme.type == "--SELECT--" || this.organismeAccueil.typeServiceOrganisme.type == "--SELECT--" ||
      this.organismeAccueil.ville.nom == "--SELECT--" || this.organismeAccueil.ville.pays.nom == "--SELECT--";
  }

  deleteOrganisme(organisme: OrganismeAccueil) {
    this.organismeService.deleteOrganisme(organisme.id).subscribe(resp => {
      if (resp > 0) {
        this.notificationService.showSuccess("l'Organisme est supprimé avec succès!", "La structure d'accueil");
        this.organismes.splice(this.organismes.indexOf(organisme), 1);
        this.pageOrganisme.content.splice(this.pageOrganisme.content.indexOf(organisme), 1);
      } else {
        this.notificationService.showWarning("Erreur dans la suppression de l'organisme!", "La structure d'accueil");
      }
    }, error => {
      this.notificationService.showError("Erreur est survenu", "La structure d'accueil")
    })
  }

  addOrga() {
    this.ajouterOrganisme = true;
    this.organismeService.organismeAcceuil = new OrganismeAccueil();
    this.initOrganisme();
  }

  get organismeAccueil() {
    return this.organismeService.organismeAcceuil;
  }

  chargerParType(type: string) {
    this.configurationService.organismeElements = [];
    this.configurationService.findByType(type, this.page, this.size);
  }

  chargerParService(service: string) {
    this.configurationService.organismeElements = [];
    this.configurationService.findByService(service, this.page, this.size);
  }

  chargerParVille(ville: string) {
    this.configurationService.organismeElements = [];
    this.configurationService.findByVilleNom(ville, this.page, this.size);
  }

  findAll() {
    this.configurationService.organismeElements = [];
    this.configurationService.getAllorganismes(this.page, this.size);
  }

  get pageOrganisme() {
    return this.configurationService.organismePage;
  }

  get organismes() {
    return this.configurationService.organismes;
  }

  nextElements() {
    if (this.page <= this.pageOrganisme.totalPages) {
      this.page++;
      this.findAll();
      this.configurationService.organismeElements = [];
    }
  }

  prevElements() {
    if (this.page >= 0) {
      this.page--;
      this.findAll();
      this.configurationService.organismeElements = [];
    }
  }

  getIndexPage(i: number) {
    if (i <= this.pageOrganisme.totalPages) {
      this.page = i;
      this.findAll();
      this.configurationService.organismeElements = [];
    }
  }

  get organismeElements() {
    return this.configurationService.organismeElements;
  }

  resizePage() {
    this.findAll();
    this.configurationService.organismeElements = [];
    this.searching = false;
  }

  get villes() {
    return this.organismeService.villes
  }

  get typeOrganismes() {
    return this.organismeService.typeOrganismes;
  }

  get typeServiceOrganismes() {
    return this.organismeService.typeServiceOrganismes;
  }

  initOrganisme() {
    this.organismeAccueil.ville = new Ville();
    this.organismeAccueil.ville.pays = new Pays();
    this.organismeAccueil.typeOrganisme = new TypeOrganisme();
    this.organismeAccueil.typeServiceOrganisme = new TypeServiceOrganisme();
    this.organismeAccueil.ville.nom = this.organismeAccueil.ville.pays.nom = this.organismeAccueil.typeOrganisme.type = this.organismeAccueil.typeServiceOrganisme.type = "--SELECT--";
  }

}
