import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '@app/guards/auth.guard';

import { ManageUsersComponent } from "./manage-users.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";

const routes: Routes = [

  {
    path: '', component: ManageUsersComponent, canActivate: [AuthGuard],
    children: [
      { path: 'new-user', component: NewUserComponent ,canActivate: [AuthGuard]},
      { path: "edit-user/:id", component: EditUserComponent ,canActivate: [AuthGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
