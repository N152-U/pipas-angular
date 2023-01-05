import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { MantainanceComponent } from './components/pages/mantainance/mantainance.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { GraphicsComponent } from './components/pages/graphics/graphics/graphics.component';
import { ManagmentModule } from './components/pages/managment/managment.module';
import { TripsComponent } from './components/pages/trips/trips/trips.component';
import { EditTripsComponent } from './components/pages/trips/edit-trips/edit-trips.component';
import { TripsListComponent } from './components/pages/trips/trips-list/trips-list.component';
import { HistoryTripsComponent } from './components/pages/trips/history-trips/history-trips.component';
import { DriverVehicleComponent } from './components/pages/driverVehicle/driver-vehicle/driver-vehicle.component';
import { DriverVehicleTableComponent } from './components/pages/driverVehicle/driver-vehicle-table/driver-vehicle-table.component';
import { EditDriverVehicleComponent } from './components/pages/driverVehicle/edit-driver-vehicle/edit-driver-vehicle.component';
import { CollaboratorComponent } from './components/pages/collaborator/collaborator/collaborator.component';
import { CollaboratorTableComponent } from './components/pages/collaborator/collaborator-table/collaborator-table.component';
import { EditCollaboratorComponent } from './components/pages/collaborator/edit-collaborator/edit-collaborator.component';
import { AssociateTripComponent } from './components/pages/trips/associate-trip/associate-trip.component';
import { TripsDetailComponent } from './components/pages/trips/trips-detail/trips-detail.component';
import { TripFoliosComponent } from './components/pages/trips/trip-folios/trip-folios.component';
import { ExportsComponent } from './components/pages/trips/exports/exports.component';



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

  { path: 'enlace', 
  children: [
    { path: 'list', component: CollaboratorTableComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditCollaboratorComponent, canActivate: [AuthGuard] },  
    { path: 'create', component: CollaboratorComponent, canActivate: [AuthGuard] }, 
  ]},

  { path: 'pipas', 
  children: [
    { path: 'list', component: DriverVehicleTableComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditDriverVehicleComponent, canActivate: [AuthGuard] },  
    { path: 'create', component: DriverVehicleComponent, canActivate: [AuthGuard] }, 
  ]},

  { path: 'trips', 
  children: [
    { path: 'history', component: HistoryTripsComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditTripsComponent, canActivate: [AuthGuard] },  
    { path: 'create', component: TripsComponent, canActivate: [AuthGuard] }, 
    { path: 'list', component: TripsListComponent, canActivate: [AuthGuard] }, 
    { path: 'detail/:id', component: TripsDetailComponent, canActivate: [AuthGuard] }, 
    { path: 'folios/:id', component: TripFoliosComponent, canActivate: [AuthGuard] }, 
    { path: 'associate/:id', component: AssociateTripComponent, canActivate: [AuthGuard] }, 
    { path: 'exports', component: ExportsComponent, canActivate: [AuthGuard] }, 
  ]},

  { path: 'about', component: AboutComponent },
  { path: 'mantainance', component: MantainanceComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
    ManagmentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
