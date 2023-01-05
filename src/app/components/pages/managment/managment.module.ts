import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagmentComponent } from './managment.component';
import { ManagmentRoutingModule } from './managment-routing.module';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        ManagmentRoutingModule,
        CommonModule,
        NgxPermissionsModule,
        NgxPermissionsModule.forRoot(),
        NgxPermissionsModule.forChild(),
    ],
    declarations: [
        ManagmentComponent,
    ],
    providers: []
})
export class ManagmentModule { } 