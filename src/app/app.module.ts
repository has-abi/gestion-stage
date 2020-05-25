import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {FormsModule} from "@angular/forms";
import {AdminMenuComponent} from "./components/admin/admin-menu/admin-menu.component";
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { MainComponent } from './components/admin/main/main.component';
import { AdminComponent } from './components/admin/admin.component';
import { UtilisateurTableComponent } from './components/admin/tables/utilisateur-table/utilisateur-table.component';
import { StageTablesComponent } from './components/admin/tables/stage-tables/stage-tables.component';

import { SujetForumComponent } from './components/sujet-forum/sujet-forum.component';
import { CreateSujetForumComponent } from './components/create-sujet-forum/create-sujet-forum.component';
import { ListSujetForumComponent } from './components/list-sujet-forum/list-sujet-forum.component';

import { NavbarComponent } from './components/coordinateur/navbar/navbar.component';
import { StageCreateComponent } from './components/stage/stage-create/stage-create.component';
import { MainCoordinateurComponent } from './components/coordinateur/main-coordinateur/main-coordinateur.component';
import { CoordinateurComponent } from './components/coordinateur/coordinateur/coordinateur.component';
import { FlashMessagesModule } from "angular2-flash-messages";
import { ListStagesComponent } from './components/stage/list-stages/list-stages.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { ProfilEtudiantComponent } from './components/etudiant/profil-etudiant/profil-etudiant.component';
import { EtudiantLoginComponent } from './components/etudiant/etudiant-login/etudiant-login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminMenuComponent,
    AdminNavbarComponent,
    MainComponent,
    AdminComponent,
    UtilisateurTableComponent,
    StageTablesComponent,
    SujetForumComponent,
    CreateSujetForumComponent,
    ListSujetForumComponent,
    NavbarComponent,
    StageCreateComponent,
    MainCoordinateurComponent,
    CoordinateurComponent,
    ListStagesComponent,
    EtudiantComponent,
    ProfilEtudiantComponent,
    EtudiantLoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
