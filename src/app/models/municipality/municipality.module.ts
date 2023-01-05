/* eslint-disable linebreak-style */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonpClientBackend } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class MunicipalityModel {

  id:string;
  municipality: string;
  geo_shape: number;

  
  
 }
