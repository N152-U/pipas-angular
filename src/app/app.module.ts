
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { NgxCaptchaModule } from 'ngx-captcha'; 
//Http Requests
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
//Services
import { AuthService } from './services/auth/auth.service';

//Models
import { UserModel } from './models/user/user.module';

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
import { SavePiperoComponent } from './components/pages/pipero/save-pipero/save-pipero.component';
import { EditPiperoComponent } from './components/pages/pipero/edit-pipero/edit-pipero.component';
import { EditPromoterComponent } from './components/pages/promoter/edit-promoter/edit-promoter.component';
import { SavePromoterComponent } from './components/pages/promoter/save-promoter/save-promoter.component';
import { EditTankertruckComponent } from './components/pages/tankertruck/edit-tankertruck/edit-tankertruck.component';
import { SaveTankertruckComponent } from './components/pages/tankertruck/save-tankertruck/save-tankertruck.component';
import { TableTankertruckComponent } from './components/pages/tankertruck/table-tankertruck/table-tankertruck.component';
import { TablePromoterComponent } from './components/pages/promoter/table-promoter/table-promoter.component';
import { TablePiperoComponent } from './components/pages/pipero/table-pipero/table-pipero.component';
import { DeliveryDetailComponent } from './components/pages/delivery/delivery-detail/delivery-detail.component';
import { DeliveryComponent } from './components/pages/delivery/delivery/delivery.component';
import { TableDeliveryDetailComponent } from './components/pages/delivery/table-delivery-detail/table-delivery-detail.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EditDeliveyDetailComponent } from './components/pages/delivery/edit-delivey-detail/edit-delivey-detail.component';
import { TableDeliveryComponent } from './components/pages/delivery/table-delivery/table-delivery.component';
import { GraphicsComponent } from './components/pages/Graficos/graphics/graphics.component';
import { GraphicsBarComponent } from './components/pages/Graficos/graphics-bar/graphics-bar.component';
import { GraphicsLitersofwaterComponent } from './components/pages/Graficos/graphics-litersofwater/graphics-litersofwater.component';
import { GraphicsPeopleComponent } from './components/pages/Graficos/graphics-people/graphics-people.component';
import { GraphicsLitresMunicipalityComponent } from './components/pages/Graficos/graphics-litres-municipality/graphics-litres-municipality.component';



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
    SavePiperoComponent,
    EditPiperoComponent,
    EditPromoterComponent,
    SavePromoterComponent,
    EditTankertruckComponent,
    SaveTankertruckComponent,
    TableTankertruckComponent,
    TablePromoterComponent,
    TablePiperoComponent,
    DeliveryDetailComponent,
    DeliveryComponent,
    TableDeliveryDetailComponent,
    EditDeliveyDetailComponent,
    TableDeliveryComponent,
    GraphicsComponent,
    GraphicsBarComponent,
    GraphicsLitersofwaterComponent,
    GraphicsPeopleComponent,
    GraphicsLitresMunicipalityComponent,

    
    
  ],
  imports: [
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
    NgxCaptchaModule
  ],
  providers: [UserModel, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent],
  exports: [
    BsDatepickerModule,
    NgxPermissionsModule
  ]
})
export class AppModule { }
