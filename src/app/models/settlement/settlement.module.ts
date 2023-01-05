/* eslint-disable linebreak-style */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SettlementModel {
  
  municipalityId: number;
  zip_code: number;
  settlement: string;
  d_tipo_asenta: string;
  d_mnpio: string;
  d_estado: string;
  d_ciudad: string;
  d_cp: string;
  c_estado: string;
  c_oficina: string;
  c_tipo_asenta: string;
  c_mnpio: string;
  id_asenta_cpcons: string;
  d_zona: string;


}
