import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {AdminMenuComponent} from "./components/admin/admin-menu/admin-menu.component";
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { MainComponent } from './components/admin/main/main.component';
import { AdminComponent } from './components/admin/admin.component';
import { UtilisateurTableComponent } from './components/admin/tables/utilisateur-table/utilisateur-table.component';
import { StageTablesComponent } from './components/admin/tables/stage-tables/stage-tables.component';
import { SujetForumComponent } from './components/sujet-forum/sujet-forum.component';
import { CreateSujetForumComponent } from './components/create-sujet-forum/create-sujet-forum.component';
import { ListSujetForumComponent } from './components/list-sujet-forum/list-sujet-forum.component';


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
    ListSujetForumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
