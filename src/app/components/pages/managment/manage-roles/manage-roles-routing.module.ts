/* eslint-disable linebreak-style */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '@app/guards/auth.guard';

import { ManageRolesComponent } from "./manage-roles.component";
import { NewRoleComponent } from "./new-role/new-role.component";
import { EditRoleComponent } from "./edit-role/edit-role.component";
import { DetailRoleComponent } from "./detail-role/detail-role.component";


const routes: Routes = [
  {
    path: '', component: ManageRolesComponent,
    children: [
      { path: 'new-role', component: NewRoleComponent  ,canActivate: [AuthGuard]},
      { path: 'edit-role/:hash', component: EditRoleComponent ,canActivate: [AuthGuard] },
      { path: 'detail-role/:hash', component: DetailRoleComponent ,canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRolesRoutingModule {}
