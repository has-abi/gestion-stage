import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StageCreateComponent} from "./components/stage/stage-create/stage-create.component";
import {ListStagesComponent} from "./components/stage/list-stages/list-stages.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {CoordinateurComponent} from "./components/coordinateur/coordinateur/coordinateur.component";
import {ViewStageComponent} from "./components/stage/view-stage/view-stage.component";
import {AuthGuard} from "./auth/auth.guard";
import {EtudiantComponent} from "./components/etudiant/etudiant.component";
import {ArchiveTachesComponent} from "./components/tache/archive-taches/archive-taches.component";
import {EncadreurComponent} from "./components/encadreur/encadreur/encadreur.component";
import {MainEncadreurComponent} from "./components/encadreur/main-encadreur/main-encadreur.component";
import {AdminComponent} from "./components/admin/admin.component";
import {MainComponent} from "./components/admin/main/main.component";
import {AutreComponent} from "./components/admin/config/autre/autre.component";
import {ListEtudiantComponent} from "./components/etudiant/list-etudiant/list-etudiant.component";
import {ListEncadreurComponent} from "./components/encadreur/list-encadreur/list-encadreur.component";
import {OrganismesComponent} from "./components/admin/config/organismes/organismes.component";
import {EtudiantMainComponent} from "./components/etudiant/etudiant-main/etudiant-main.component";
import {MainProfileComponent} from "./components/main-profile/main-profile.component";
import {UtilisateurTableComponent} from "./components/admin/tables/utilisateur-table/utilisateur-table.component";
import {RapportTableComponent} from "./components/admin/tables/rapport-table/rapport-table.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {JuryComponent} from "./components/jury/jury.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {ForumComponent} from "./components/forum/forum.component";
import {PlanningComponent} from "./components/coordinateur/planning/planning.component";


const routes: Routes = [

  //coordinateur routes
  {path:"coordinateur",component: CoordinateurComponent,canActivate: [AuthGuard],data:{
      expectedRoles: ['COORDINATEUR_ROLE']
    },
  children:[
    {path:"stage/create",component:StageCreateComponent},
    {path:"stage/list",component: ListStagesComponent},
    {path:"stage",component:ViewStageComponent},
    {path:"etudiants",component:ListEtudiantComponent},
    {path:"encadreurs",component:ListEncadreurComponent},
    {path:"jurys",component:ListEncadreurComponent},
    {path:"structures",component:OrganismesComponent},
    {path:"planning",component: PlanningComponent},
    {path:'',redirectTo:'stage/list',pathMatch:'full'},
    {path:'**',redirectTo:'stage/list',pathMatch:'full'}
  ]},
  //etudiant routes
  {path: "etudiant",component:EtudiantComponent,canActivate: [AuthGuard],data: {
    expectedRoles: ['ETUDIANT_ROLE']
    },
    children: [
      {path: "profile",component:EtudiantMainComponent},
      {path: "stage/archive",component:ListStagesComponent},
      {path: "tache/archive",component:ArchiveTachesComponent},
      {path: '**',redirectTo:'etudiant/profile',pathMatch: 'full'}
    ]
  },
  //encadeur routes
  {path: "encadreur",component:EncadreurComponent,canActivate: [AuthGuard],data: {
    expectedRoles: ['ENCADREUR_ROLE']
    },
    children:[
      {path: "profile",component:MainEncadreurComponent},
      {path:"tache/archive",component:ArchiveTachesComponent},
      {path: "stage/archive",component:ListStagesComponent},
      {path: '',redirectTo:'encadreur/profile',pathMatch: 'full'},
      {path:'**',redirectTo: 'encadreur/profile'}
    ]
  },
  //admin routes
  {path: "admin",component:AdminComponent,canActivate: [AuthGuard],data: {
    expectedRoles: ['ADMIN_ROLE']
    },
  children: [
    {path: "profile",component:MainComponent},
    {path: "configuration",component:AutreComponent},
    {path:"utilisateurs",component: UtilisateurTableComponent},
    {path:"stages",component: ListStagesComponent},
    {path:"rapports",component: RapportTableComponent},
    {path:"statistics",component: StatisticsComponent},
    {path: '',redirectTo:'admin/profile',pathMatch: 'full'},
    {path:'**',component: MainComponent}
  ]
  },
  //jury routes
  {path: "jury",component: JuryComponent,canActivate: [AuthGuard],data: {
    expectedRoles: ['JURY_ROLE']
    },
    children: [
      {path: "stages",component: ListStagesComponent},
      {path: "modifier/profile",component: EditProfileComponent},
      {path: "",redirectTo: "jury/stages",pathMatch: 'full'},
      {path: "**",redirectTo: 'jury/stages'}
    ]
    },
  //forum
  {path: "forum",component: ForumComponent,canActivate: [AuthGuard],data: {
    expectedRoles: ['COORDINATEUR_ROLE','ETUDIANT_ROLE','ENCADREUR_ROLE','JURY_ROLE','ADMIN_ROLE']
    }},
  //auth routes
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  //main page
  {path:'',component: MainProfileComponent,pathMatch:'full',canActivate: [AuthGuard],data: {
    expectedRoles: ['COORDINATEUR_ROLE','ETUDIANT_ROLE','ENCADREUR_ROLE','JURY_ROLE','ADMIN_ROLE']
    }}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
