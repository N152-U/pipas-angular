import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';

import { ManagmentComponent } from './managment.component';

const manageRolesModule = () => import('./manage-roles/manage-roles.module').then(x => x.ManageRolesModule);
const manageUsersModule = () => import('./manage-users/manage-users.module').then(x => x.ManageUsersModule);

const managmentRoutes: Routes = [
  { 
    path: 'managment', component: ManagmentComponent, canActivate: [AuthGuard], children: [
       {   path: 'manage-roles', loadChildren: manageRolesModule,canActivate: [AuthGuard] },
       {   path: 'manage-users', loadChildren: manageUsersModule,canActivate: [AuthGuard] },
      
      ],

      },
    
];

@NgModule({
  imports: [ RouterModule.forChild(managmentRoutes) ],
  exports: [ RouterModule ]
})
export class ManagmentRoutingModule{ } 