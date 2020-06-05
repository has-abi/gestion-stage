import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxWebstorageModule} from "ngx-webstorage";
import { NgpSortModule } from "ngp-sort-pipe";
import {AdminMenuComponent} from "./components/admin/admin-menu/admin-menu.component";
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { MainComponent } from './components/admin/main/main.component';
import { AdminComponent } from './components/admin/admin.component';
import { UtilisateurTableComponent } from './components/admin/tables/utilisateur-table/utilisateur-table.component';
import { StageTablesComponent } from './components/admin/tables/stage-tables/stage-tables.component';
import { NavbarComponent } from './components/coordinateur/navbar/navbar.component';
import { StageCreateComponent } from './components/stage/stage-create/stage-create.component';
import { MainCoordinateurComponent } from './components/coordinateur/main-coordinateur/main-coordinateur.component';
import { CoordinateurComponent } from './components/coordinateur/coordinateur/coordinateur.component';
import { FlashMessagesModule } from "angular2-flash-messages";
import { ListStagesComponent } from './components/stage/list-stages/list-stages.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CoordinateurAccueilComponent } from './components/coordinateur/coordinateur-accueil/coordinateur-accueil.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { EtudiantNavbarComponent } from './components/etudiant/etudiant-navbar/etudiant-navbar.component';
import { EtudiantMainComponent } from './components/etudiant/etudiant-main/etudiant-main.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RapportComponent } from './components/modals/rapport/rapport.component';
import { RapportDisplayComponent } from './components/modals/rapport-display/rapport-display.component';
import { AjouterOrganismeComponent } from './components/modals/ajouter-organisme/ajouter-organisme.component';
import { ViewStageComponent } from './components/stage/view-stage/view-stage.component';
import { RapportFormComponent } from './components/rapport/rapport-form/rapport-form.component';
import { OrganismeFormComponent } from './components/organisme/organisme-form/organisme-form.component';
import { ListEncadreurComponent } from './components/encadreur/list-encadreur/list-encadreur.component';
import { ListEtudiantComponent } from './components/etudiant/list-etudiant/list-etudiant.component';
import { ListJuryComponent } from './components/jury/list-jury/list-jury.component';
import { SearchComponent } from './components/search/search.component';
import { ConventionComponent } from './components/pdf/convention/convention.component';
import { MainEncadreurComponent } from './components/encadreur/main-encadreur/main-encadreur.component';
import { NavbarEncadreurComponent } from './components/encadreur/navbar-encadreur/navbar-encadreur.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RapportTableComponent } from './components/admin/tables/rapport-table/rapport-table.component';
import { ForumTableComponent } from './components/admin/tables/forum-table/forum-table.component';
import { ForumComponent } from './components/forum/forum.component';
import { UserCreateComponent } from './components/modals/user-create/user-create.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminMenuComponent,
    AdminNavbarComponent,
    MainComponent,
    AdminComponent,
    UtilisateurTableComponent,
    StageTablesComponent,
    NavbarComponent,
    StageCreateComponent,
    MainCoordinateurComponent,
    CoordinateurComponent,
    ListStagesComponent,
    LoginComponent,
    RegisterComponent,
    CoordinateurAccueilComponent,
    EtudiantComponent,
    EtudiantNavbarComponent,
    EtudiantMainComponent,
    EditProfileComponent,
    RapportComponent,
    RapportDisplayComponent,
    AjouterOrganismeComponent,
    ViewStageComponent,
    RapportFormComponent,
    OrganismeFormComponent,
    ListEncadreurComponent,
    ListEtudiantComponent,
    ListJuryComponent,
    SearchComponent,
    ConventionComponent,
    MainEncadreurComponent,
    NavbarEncadreurComponent,
    StatisticsComponent,
    RapportTableComponent,
    ForumTableComponent,
    ForumComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgpSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
