import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StageCreateComponent} from "./components/stage/stage-create/stage-create.component";
import {ListStagesComponent} from "./components/stage/list-stages/list-stages.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {CoordinateurComponent} from "./components/coordinateur/coordinateur/coordinateur.component";
import {CoordinateurAccueilComponent} from "./components/coordinateur/coordinateur-accueil/coordinateur-accueil.component";


const routes: Routes = [
  {path: "stage/create",component:StageCreateComponent},
  {path: "stage/list",component: ListStagesComponent},
  {path:"coordinateur",component: CoordinateurComponent},
  {path:"coordinateur/profile",component: CoordinateurAccueilComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:'',redirectTo:"login",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
