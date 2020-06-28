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
              private flashMessagesService: FlashMessagesService) {
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
        this.flashMessagesService.show("Etablissement Modifier avec succée!", {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashMessagesService.show("Erreur dans la modification de l'établissement!", {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
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
          this.flashMessagesService.show("ville créé avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.villes.push(this.ville);
          this.ville = new Ville();
        } else {
          this.flashMessagesService.show("Erreur dans la création de la ville!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });

    } else {
      this.configurationService.updateVille(this.ville).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("ville modifier avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
          this.ville = new Ville();
        } else {
          this.flashMessagesService.show("Erreur dans la modification de la ville!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
    }
  }

  createPays() {
    if (!this.pay.id) {
      this.configurationService.createPays(this.pay).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Pays créé avec succéé!", {cssClass: 'alert-success', timeout: 5000});
            this.pays.push(this.pay);
            this.pay = new Pays();
          } else {
          this.flashMessagesService.show("Erreur dans la création du pays!", {cssClass: 'alert-danger', timeout: 5000});
        }
      });

    } else {
      this.configurationService.updatePays(this.pay).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Pays modifier avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
          this.pay = new Pays();
        } else {
          this.flashMessagesService.show("Erreur dans la modification du Pays!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
    }
  }

  createFiliere() {
    if (!this.filiere.id) {
      this.configurationService.createFiliere(this.filiere).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Filière créé avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.filieres.push(this.filiere);
          this.filiere = new Filiere();
        } else {
          this.flashMessagesService.show("Erreur dans la création du Filière!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });

    } else {
      this.configurationService.updateFiliere(this.filiere).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Filière modifier avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
          this.filiere = new Filiere();
        } else {
          this.flashMessagesService.show("Erreur dans la modification du Filière!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
    }
  }

  createDep() {
    if (!this.dep.id) {
      this.configurationService.createDep(this.dep).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Département créé avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.departements.push(this.dep);
          this.dep = new Departement();
        } else {
          this.flashMessagesService.show("Erreur dans la création du Département!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });

    } else {
      this.configurationService.updateDep(this.dep).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Département modifier avec succéé!", {
            cssClass: 'alert-success',
            timeout: 5000
          });
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
          this.dep = new Departement();
        } else {
          this.flashMessagesService.show("Erreur dans la modification du Département!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
    }
  }

  createType() {
    if (!this.type.id) {
      this.configurationService.createType(this.type).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Type créé avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.typeOrganismes.push(this.type);
          this.type = new TypeOrganisme();
        } else {
          this.flashMessagesService.show("Erreur dans la création du Type!", {cssClass: 'alert-danger', timeout: 5000});
        }
      });

    } else {
      this.configurationService.updateType(this.type).subscribe(resp => {
        if (resp > 0) {

          this.flashMessagesService.show("Type modifier avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.ajouterElement.element = "";
          this.type = new TypeOrganisme();
          this.ajouterElement.ajouter = false;
        } else {
          this.flashMessagesService.show("Erreur dans la modification du Type!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
    }
  }

  createService() {
    if (!this.service.id) {
      this.configurationService.createService(this.service).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Service créé avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.typeServiceOrganismes.push(this.service);
          this.service = new TypeServiceOrganisme();
        } else {
          this.flashMessagesService.show("Erreur dans la création du Service!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });

    } else {
      this.configurationService.updateService(this.service).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Service modifier avec succéé!", {cssClass: 'alert-success', timeout: 5000});
          this.service = new TypeServiceOrganisme();
          this.ajouterElement.element = "";
          this.ajouterElement.ajouter = false;
        } else {
          this.flashMessagesService.show("Erreur dans la modification du Service!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
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
