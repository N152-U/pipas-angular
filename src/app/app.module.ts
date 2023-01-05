
import { RequestsPendingService } from './services/requests/requests-pending.service';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { NgxCaptchaModule } from 'ngx-captcha'; 
//Http Requests
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
//Services
import { AuthService } from './services/auth/auth.service';

//Models
import { UserModel } from '@app/models/user/userModel.module';

//Installed extra modules
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';

import { ToastrModule } from 'ngx-toastr';
// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//Routes
import { AppRoutingModule } from './app-routing.module';

//Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

//Pages and single components
import { AppComponent } from './app.component';

import { LoginComponent } from './components/pages/login/login.component';

import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { WebdatarocksComponent } from "./components/shared/Webdatarocks/webdatarocks.component";
import { ScrollTopComponent } from './components/shared/scrolltop/scrolltop.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MantainanceComponent } from './components/pages/mantainance/mantainance.component';

import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import {TreeTableModule} from 'primeng/treetable';
import {BlockUIModule} from 'primeng/blockui';
import {PanelModule} from 'primeng/panel';
import {RippleModule} from 'primeng/ripple';
import {ToolbarModule} from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {RatingModule} from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import { DividerModule } from "primeng/divider";
import { MenuItem } from 'primeng/api';

import { NgxPermissionsModule } from 'ngx-permissions';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GraphicsComponent } from './components/pages/graphics/graphics/graphics.component';
import { GraphicsBarComponent } from './components/pages/graphics/graphics-bar/graphics-bar.component';
import { GraphicsLitersofwaterComponent } from './components/pages/graphics/graphics-litersofwater/graphics-litersofwater.component';
import { GraphicsPeopleComponent } from './components/pages/graphics/graphics-people/graphics-people.component';
import { GraphicsLitresMunicipalityComponent } from './components/pages/graphics/graphics-litres-municipality/graphics-litres-municipality.component';

import { EditTripsComponent } from './components/pages/trips/edit-trips/edit-trips.component';
import { HistoryTripsComponent } from './components/pages/trips/history-trips/history-trips.component';
import { TripsComponent } from './components/pages/trips/trips/trips.component';
import { DriverVehicleComponent } from './components/pages/driverVehicle/driver-vehicle/driver-vehicle.component';
import { DriverVehicleTableComponent } from './components/pages/driverVehicle/driver-vehicle-table/driver-vehicle-table.component';
import { EditDriverVehicleComponent } from './components/pages/driverVehicle/edit-driver-vehicle/edit-driver-vehicle.component';
import { CollaboratorComponent } from './components/pages/collaborator/collaborator/collaborator.component';
import { CollaboratorTableComponent } from './components/pages/collaborator/collaborator-table/collaborator-table.component';
import { EditCollaboratorComponent } from './components/pages/collaborator/edit-collaborator/edit-collaborator.component';
import { BrowserModule } from '@angular/platform-browser';
import { PdfComponent } from './components/pages/resource/pdf/pdf.component';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputMaskModule} from 'primeng/inputmask';
import { TripsDetailComponent } from './components/pages/trips/trips-detail/trips-detail.component';
import { AssociateTripComponent } from './components/pages/trips/associate-trip/associate-trip.component';
import { TripsListComponent } from './components/pages/trips/trips-list/trips-list.component';
import { TripFoliosComponent } from './components/pages/trips/trip-folios/trip-folios.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CommaFormatPipe } from './comma-format.pipe';
import { ExportsComponent } from './components/pages/trips/exports/exports.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MantainanceComponent,
    WebdatarocksComponent,
    SpinnerComponent,
    ScrollTopComponent,
    ProfileComponent,
    GraphicsComponent,
    GraphicsBarComponent,
    GraphicsLitersofwaterComponent,
    GraphicsPeopleComponent,
    GraphicsLitresMunicipalityComponent,
    EditTripsComponent,
    HistoryTripsComponent,
    TripsComponent,
    DriverVehicleComponent,
    DriverVehicleTableComponent,
    EditDriverVehicleComponent,
    CollaboratorComponent,
    CollaboratorTableComponent,
    EditCollaboratorComponent,
    PdfComponent,
    TripsDetailComponent,
    AssociateTripComponent,
    TripsListComponent,
    TripFoliosComponent,
    CommaFormatPipe,
    ExportsComponent,
  ],
  imports: [ 
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxPermissionsModule,
    BrowserAnimationsModule,
    PortalModule,
    BsDatepickerModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    AccordionModule,
    TableModule,
    ToolbarModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TooltipModule,
    TreeTableModule,
    BlockUIModule,
    PanelModule,
    InputNumberModule,
    RippleModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    TabViewModule,
    MenuModule,    
    FileUploadModule,
    RatingModule,
    CardModule,
    ChartModule,
    DividerModule,    
    ToastrModule,
    NgxCaptchaModule,
    MessageModule,
    KeyFilterModule,
    InputMaskModule,
    NgxPermissionsModule.forChild(),
  ],
  providers: [UserModel, AuthService, NgxImageCompressService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy }, RequestsPendingService],
  bootstrap: [AppComponent],
  exports: [
    BsDatepickerModule,
    NgxPermissionsModule
  ]
})
export class AppModule { }
