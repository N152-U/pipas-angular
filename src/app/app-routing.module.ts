import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AboutComponent } from './components/pages/about/about.component';

import { AuthGuard } from './guards/auth.guard';
import { MantainanceComponent } from './components/pages/mantainance/mantainance.component';
import { ProfileComponent } from './components/shared/profile/profile.component';

import { SavePiperoComponent } from './components/pages/pipero/save-pipero/save-pipero.component';
import { SavePromoterComponent } from './components/pages/promoter/save-promoter/save-promoter.component';
import { SaveTankertruckComponent } from './components/pages/tankertruck/save-tankertruck/save-tankertruck.component';
import { TableTankertruckComponent } from './components/pages/tankertruck/table-tankertruck/table-tankertruck.component';
import { TablePiperoComponent } from './components/pages/pipero/table-pipero/table-pipero.component';
import { TablePromoterComponent } from './components/pages/promoter/table-promoter/table-promoter.component';
import { EditTankertruckComponent } from './components/pages/tankertruck/edit-tankertruck/edit-tankertruck.component';
import { EditPromoterComponent } from './components/pages/promoter/edit-promoter/edit-promoter.component';
import { EditPiperoComponent } from './components/pages/pipero/edit-pipero/edit-pipero.component';
import { DeliveryComponent } from './components/pages/delivery/delivery/delivery.component';
import { DeliveryDetailComponent } from './components/pages/delivery/delivery-detail/delivery-detail.component';
import { TableDeliveryDetailComponent } from './components/pages/delivery/table-delivery-detail/table-delivery-detail.component';
import { EditDeliveyDetailComponent } from './components/pages/delivery/edit-delivey-detail/edit-delivey-detail.component';
import { TableDeliveryComponent } from './components/pages/delivery/table-delivery/table-delivery.component';
import { GraphicsComponent } from './components/pages/Graficos/graphics/graphics.component';

import { ManagmentModule } from './components/pages/managment/managment.module';
import { ManageUsersModule } from './components/pages/managment/manage-users/manage-users.module';
import { ManageRolesModule } from './components/pages/managment/manage-roles/manage-roles.module';


const managmentModule = () => import('./components/pages/managment/managment.module').then(x => x.ManagmentModule);

//En todos los componentes que tengan el canActivate se mostrara la barra de navegacion
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'managment', loadChildren: managmentModule, canActivate: [AuthGuard] },
  {  path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  children: [
    { path: 'graphics', component: GraphicsComponent, canActivate: [AuthGuard] },
  ]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'tankertruck', component: TableTankertruckComponent, canActivate: [AuthGuard] ,
  children: [
  { path: 'save-tankertruck', component: SaveTankertruckComponent, canActivate: [AuthGuard] },
  { path: 'edit-tankertruck/:id', component: EditTankertruckComponent, canActivate: [AuthGuard] },  
  ]}, 
  { path: 'promotor', component: TablePromoterComponent, canActivate: [AuthGuard],
  children: [
    { path: 'save-promotor', component: SavePromoterComponent, canActivate: [AuthGuard] },
    { path: 'edit-promotor/:id', component: EditPromoterComponent, canActivate: [AuthGuard] },  
  ]},
  { path: 'pipero', component: TablePiperoComponent, canActivate: [AuthGuard],
  children: [
    { path: 'save-pipero', component: SavePiperoComponent, canActivate: [AuthGuard] },
    { path: 'edit-pipero/:id', component: EditPiperoComponent, canActivate: [AuthGuard] },  
  ]},
  { path: 'delivery', canActivate: [AuthGuard],
  children: [
    { path: 'delivery-register', component: DeliveryComponent, canActivate: [AuthGuard] },
    { path: 'table-delivery', component: TableDeliveryComponent, canActivate: [AuthGuard] },
  ]},

  { path: 'delivery-detail', canActivate: [AuthGuard],
  children: [
    { path: 'delivery-detail-register/:id', component: DeliveryDetailComponent, canActivate: [AuthGuard] },
    { path: 'table-delivery-detail', component: TableDeliveryDetailComponent, canActivate: [AuthGuard] },
    { path: 'edit-delivery-detail/:id', component: EditDeliveyDetailComponent, canActivate: [AuthGuard] },
  ]},
  
 

  { path: 'about', component: AboutComponent },
  { path: 'mantainance', component: MantainanceComponent },
 
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
    ManagmentModule,
    ManageUsersModule,
    ManageRolesModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
