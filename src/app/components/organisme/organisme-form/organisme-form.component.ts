import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {OrganismeService} from "../../../services/organisme.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-organisme-form',
  templateUrl: './organisme-form.component.html',
  styleUrls: ['./organisme-form.component.css']
})
export class OrganismeFormComponent implements OnInit {

  organismeForm:FormGroup;
  typeOBox = {
    isClicked:false,
    valueChanged:false
  }
   typeSBox = {
    isClicked:false,
    valueChanged:false
  }
  villeBox = {
    isClicked:false,
    valueChanged:false
  }
  paysBox = {
    isClicked:false,
    valueChanged:false
  }
  constructor(private stageService:StageService,private organismeService:OrganismeService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.organismeForm = new FormGroup({
      raisonSocial:new FormControl('',[
        Validators.required
      ]),
      email:new FormControl('',[
        Validators.required
      ]),
      gsm:new FormControl('',[
        Validators.required
      ]),
      fix:new FormControl('',[
        Validators.required
      ]),
      adress:new FormControl('',[
        Validators.required
      ]),
      responsable:new FormControl('',[
        Validators.required
      ]),
      typeO:new FormControl('--SELECT--',[
        Validators.required
      ]),
      typeS:new FormControl('--SELECT--',[
        Validators.required
      ]),
      ville:new FormControl('--SELECT--',[
        Validators.required
      ]),
      pay:new FormControl('--SELECT--',[
      Validators.required
    ]),
    })
    this.organismeService.findAllVille();
    this.organismeService.findAllTypeServiceOrganisme();
    this.organismeService.findAllTypeOrganisme();
    this.organismeService.findAllPays();
    console.log(this.stage);
  }
  get stage(){
    return this.stageService.stage;
  }
  get typeOrganismes(){
    return this.organismeService.typeOrganismes;
  }
  get typeServiceOrganismes(){
    return this.organismeService.typeServiceOrganismes;
  }
  get villes(){
    return this.organismeService.villes;
  }
  get pays(){
    return this.organismeService.pays;
  }
  get organismeAccueil(){
    return this.organismeService.organismeAcceuil;
  }

  get raisonSocial(){
    return this.organismeForm.get('raisonSocial');
  }
  get email(){
    return this.organismeForm.get('email');
  }
  get gsm(){
    return this.organismeForm.get('gsm');
  }
  get fix(){
    return this.organismeForm.get('fix');
  }
  get adress(){
    return this.organismeForm.get('adress');
  }
  get responsable(){
    return this.organismeForm.get('responsable');
  }
  get typeO(){
    return this.organismeForm.get('typeO');
  }
  get typeS(){
    return this.organismeForm.get('typeS');
  }
  get ville(){
    return this.organismeForm.get('ville');
  }
  get pay(){
    return this.organismeForm.get('pay');
  }
  AjouterOrganisme(formData){
    if(!this.validateForm()) {
      this.organismeAccueil.raisonSociale = formData.raisonSocial;
      this.organismeAccueil.email = formData.email;
      this.organismeAccueil.tele = formData.gsm;
      this.organismeAccueil.teleFix = formData.fix;
      this.organismeAccueil.adress = formData.adress;
      this.organismeAccueil.responsable = formData.responsable;
      this.organismeAccueil.typeOrganisme.type = formData.typeO;
      this.organismeAccueil.typeServiceOrganisme.type = formData.typeS;
      this.organismeAccueil.ville.nom = formData.ville;
      this.organismeAccueil.ville.pays.nom = formData.pay;
      this.stage.organismeAccueil = this.organismeAccueil;
      this.stageService.update(this.stage);
      console.log(this.stage);
      console.log(this.organismeAccueil);
    }

  }
  validateForm(){
    return this.raisonSocial.errors != null || this.email.errors != null || this.gsm.errors != null || this.fix.errors != null ||
    this.adress.errors != null || this.responsable.errors != null || !this.typeOBox.valueChanged || !this.typeSBox.valueChanged  ||
    !this.villeBox.valueChanged || !this.paysBox.valueChanged;
  }
  changeVille(){
    this.villeBox.isClicked = true;
    if(this.organismeAccueil.ville.nom != '--SELECT--'){
      this.villeBox.valueChanged = true;
    }
  }
  changeTypeO(){
    this.typeOBox.isClicked = true;
    if(this.organismeAccueil.typeOrganisme.type != '--SELECT--'){
      this.typeOBox.valueChanged = true;
    }
  }
  changeTypeS(){
    this.typeSBox.isClicked = true;
    if(this.organismeAccueil.typeServiceOrganisme.type != '--SELECT--'){
      this.typeSBox.valueChanged = true;
    }
  }
  changePays(){
    this.paysBox.isClicked = true;
    if(this.organismeAccueil.ville.pays.nom != '--SELECT--'){
      this.organismeService.findVillesByPaysNom(this.pay.value)
      this.paysBox.valueChanged = true;
    }
  }

}
