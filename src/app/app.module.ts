import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxWebstorageModule} from "ngx-webstorage";
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
    CoordinateurAccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
