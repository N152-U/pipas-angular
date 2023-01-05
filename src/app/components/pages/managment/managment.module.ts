import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagmentComponent } from './managment.component';
import { ManagmentRoutingModule } from './managment-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        ManagmentRoutingModule,
        CommonModule
    ],
    declarations: [
        ManagmentComponent,
    ],
    providers: []
})
export class ManagmentModule { } 