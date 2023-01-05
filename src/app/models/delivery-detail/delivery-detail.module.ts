import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { MunicipalityModel } from "../municipality/municipality.module";
import { SettlementModel } from "../settlement/settlement.module";

export class DeliveryDetailModel { 
  id: string;
  d_ciudad: string;
  deliveryId: number;
  settlementId: number;
  municipalityId:number;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: number;
  phoneNumber: number;
  litersOfWater: number;
  settlement:SettlementModel;
  municipalty:MunicipalityModel;
  numberOfFamiliesServed: number;
  numberOfPeopleServed: number;
  street: string;
  block: string;
  lot: string;
  municipality: string;
  zipcode:number;
  externalNumber: string;
  internalNumber: string;
  corner: string;
  btwSecondStreet: string;
  reference: string;
  observation: string;
  gender: number;
  btwFirstStreet: string;

}
