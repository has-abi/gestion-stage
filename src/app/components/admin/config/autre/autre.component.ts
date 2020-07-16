import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import {OrganismeService} from "../../../../services/organisme.service";
import {Filiere} from "../../../../models/filiere.model";
import {Departement} from "../../../../models/departement.model";
import {Ville} from "../../../../models/ville.model";
import {Pays} from "../../../../models/pays.model";
import {TypeOrganisme} from "../../../../models/type-organisme.model";
import {TypeServiceOrganisme} from "../../../../models/type-service-organisme.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-autre',
  templateUrl: './autre.component.html',
  styleUrls: ['./autre.component.css']
})
export class AutreComponent implements OnInit {
  ajouterElement = {
    element: "",
    ajouter: false
  }
  filiere:Filiere;
  dep:Departement;
  ville:Ville;
  pay:Pays
  type:TypeOrganisme;
  service:TypeServiceOrganisme;
  updateEtablissement = false;
  constructor(private configurationService: ConfigurationService, private organismeService: OrganismeService,
              private notificationService:NotificationService) {
  }

  ngOnInit(): void {
    this.organismeService.findAllPays();
    this.organismeService.findAllVille();
    this.organismeService.findAllTypeOrganisme();
    this.organismeService.findAllTypeServiceOrganisme();
    this.configurationService.getAllFilieres();
    this.configurationService.findDepartements();
    this.ville = new Ville();
     this.pay = new Pays();
    this.type = new TypeOrganisme();
    this.service = new TypeServiceOrganisme();
    this.dep  = new Departement();
    this.filiere = new Filiere();
	this.ville.pays = new Pays();
	this.filiere.departement = new Departement();

    this.ville.pays.nom = "--SELECT--";
    this.filiere.departement.libelle = "--SELECT--";
	this.configurationService.getEtablissement()
  }
  get etablissement(){
    return this.configurationService.etablisement;
  }
  updateEtab(){
    this.configurationService.updateEtablissement().subscribe(resp=>{
      if (resp > 0) {
        this.notificationService.showSuccess("Établissement Modifier avec succès!","Configuration de l'application");
      } else {
        this.notificationService.showWarning("Erreur dans la modification de l'établissement!", "Configuration de l'application");
      }
    },error => {
      this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
    })
  }


  get departements() {
    return this.configurationService.departements;
  }

  get filieres() {
    return this.configurationService.filieres;
  }

  get villes() {
    return this.organismeService.villes;
  }

  get pays() {
    return this.organismeService.pays;
  }

  get typeOrganismes() {
    return this.organismeService.typeOrganismes;
  }

  get typeServiceOrganismes() {
    return this.organismeService.typeServiceOrganismes;
  }

  createElement(elem: string) {
    if (this.ajouterElement.element == elem) {
      this.ajouterElement.ajouter = false;
      this.ajouterElement.element = "";
    } else {
      this.ajouterElement.element = elem;
      this.ajouterElement.ajouter = true;
    }
  }

  updateElement(elem: string, value: any) {
    if (elem == 'ville') this.ville = value;
    if (elem == 'pays') this.pay = value;
    if (elem == 'dep') this.dep = value;
    if (elem == 'filiere') this.filiere = value;
    if (elem == 'type') this.type = value;
    if (elem == 'service') this.service = value;
    this.createElement(elem);
  }

  createVille() {
    if (!this.ville.id) {
      this.configurationService.createVille(this.ville).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("ville créé avec succès!","Configuration de l'application");
          this.villes.push(this.ville);
          this.ville = new Ville();
        } else {
          this.notificationService.showWarning("Erreur dans la création de la ville!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });
    } else {
      this.configurationService.updateVille(this.ville).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("ville modifier avec succès!", "Configuration de l'application");
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
          this.ville = new Ville();
        } else {
          this.notificationService.showWarning("Erreur dans la modification de la ville!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });
    }
  }

  createPays() {
    if (!this.pay.id) {
      this.configurationService.createPays(this.pay).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Pays créé avec succès!", "Configuration de l'application");
            this.pays.push(this.pay);
            this.pay = new Pays();
          } else {
          this.notificationService.showWarning("Erreur dans la création du pays!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });

    } else {
      this.configurationService.updatePays(this.pay).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Pays modifier avec succès!", "Configuration de l'application");
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
          this.pay = new Pays();
        } else {
          this.notificationService.showWarning("Erreur dans la modification du Pays!","Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });
    }
  }

  createFiliere() {
    if (!this.filiere.id) {
      this.configurationService.createFiliere(this.filiere).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Filière créé avec succès!", "Configuration de l'application");
          this.filieres.push(this.filiere);
          this.filiere = new Filiere();
        } else {
          this.notificationService.showWarning("Erreur dans la création du Filière!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });

    } else {
      this.configurationService.updateFiliere(this.filiere).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Filière modifier avec succès!", "Configuration de l'application");
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
          this.filiere = new Filiere();
        } else {
          this.notificationService.showWarning("Erreur dans la modification du Filière!","Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });
    }
  }

  createDep() {
    if (!this.dep.id) {
		this.dep.etablissement = this.etablissement;
      this.configurationService.createDep(this.dep).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Département créé avec succès!", "Configuration de l'application");
          this.departements.push(this.dep);
          this.dep = new Departement();
        } else {
          this.notificationService.showWarning("Erreur dans la création du Département!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });

    } else {
      this.configurationService.updateDep(this.dep).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Département modifier avec succès!", "Configuration de l'application");
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
          this.dep = new Departement();
        } else {
          this.notificationService.showWarning("Erreur dans la modification du Département!","Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });
    }
  }

  createType() {
    if (!this.type.id) {
      this.configurationService.createType(this.type).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Type créé avec succès!", "Configuration de l'application");
          this.typeOrganismes.push(this.type);
          this.type = new TypeOrganisme();
        } else {
          this.notificationService.showWarning("Erreur dans la création du Type!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });

    } else {
      this.configurationService.updateType(this.type).subscribe(resp => {
        if (resp > 0) {

          this.notificationService.showSuccess("Type modifier avec succès!", "Configuration de l'application");
          this.ajouterElement.element = "";
          this.type = new TypeOrganisme();
          this.ajouterElement.ajouter = false;
        } else {
          this.notificationService.showWarning("Erreur dans la modification du Type!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });
    }
  }

  createService() {
    if (!this.service.id) {
      this.configurationService.createService(this.service).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Service créé avec succès!", "Configuration de l'application");
          this.typeServiceOrganismes.push(this.service);
          this.service = new TypeServiceOrganisme();
        } else {
          this.notificationService.showWarning("Erreur dans la création du Service!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });

    } else {
      this.configurationService.updateService(this.service).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Service modifier avec succès!", "Configuration de l'application");
          this.service = new TypeServiceOrganisme();
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
        } else {
          this.notificationService.showWarning("Erreur dans la modification du Service!", "Configuration de l'application");
        }
      },error => {
        this.notificationService.showError("Erreur est survenu!","Configuration de l'application");
      });
    }
  }

  validateVille() {
    return (this.ville.nom == undefined || this.ville.nom.length == 0) || (this.ville.pays.nom == undefined || this.ville.pays.nom == "--SELECT--");
  }

  validateFiliere() {
    return (this.filiere.libelle == undefined || this.filiere.libelle.length == 0) || (this.filiere.departement.libelle == undefined || this.filiere.departement.libelle == "--SELECT--");
  }

  validatePays() {
    return (this.pay.nom == undefined || this.pay.nom.length == 0);
  }

  validateService() {
    return (this.service.type == undefined || this.service.type.length == 0);
  }

  validateType() {
    return (this.type.type == undefined || this.type.type.length == 0);
  }

  validateDep() {
    return (this.dep.libelle == undefined || this.dep.libelle.length == 0 );
  }
  validateEtablissement(){
    return (this.etablissement.libelle == undefined || this.etablissement.libelle.length == 0) || (this.etablissement.adress == undefined || this.etablissement.adress.length == 0 ) || (this.etablissement.email == undefined || this.etablissement.email.length == 0 ) ||
      (this.etablissement.doyen == undefined || this.etablissement.doyen.length == 0) || (this.etablissement.tele_fix == undefined || this.etablissement.tele_fix.length == 0 ) || (this.etablissement.tele_gsm == undefined || this.etablissement.tele_gsm.length == 0 );
  }


}
