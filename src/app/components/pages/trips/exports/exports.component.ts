import { Component, OnInit } from '@angular/core';
import { TripsService } from './../../../../services/trips/trips.service';
import { ExcelService } from './../../../../services/excel/excel.service';
@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.scss']
})
export class ExportsComponent implements OnInit {
startDate:String; 
endDate:String;

  constructor(private ts:TripsService, private es:ExcelService) { }

  ngOnInit(): void {
  }

getExcel()
{
this.ts.getRecordsBetweenDates(this.startDate,this.endDate).subscribe((data)=>{
/*  let sheets = [
      {
        name: "Avances de Obra",
        headers: [
          "capacity",
"collaborator",
"created_at",
"date",
"driverFirstName",
"driverPhoneNumber",
"eco",
"folios",
"id",
"placa",
"round",
"settlement",
"street"
        ],
        data: 
          this.obrasAvances.map((record) => {
            return Object.values(record)
         
          }),
        
        infoSquare: ``,
      },
  ]; */
  let filename = "pipas_"+(new Date().toLocaleDateString());

let sheets=data.payload.map((value:any)=>{
console.log("nombre",Object.keys(value)[0])
console.log("valores",Object.values(value)[0]["trips"])
var foliosColumns:Array<string>=[];
 var maxLength=0;
let buildFormat={
  name:Object.keys(value)[0],
  dataTrips:Object.values(value)[0]["trips"].map((record) => {
    console.log("cantidad_folios",record["folios"].length, "en", Object.keys(value)[0])
   
   /*  if(record["folios"].length>maxLength)maxLength=record["folios"].length
     
    

    for (let i=0;i<maxLength;i++)
    {let columnText="folio"
     
      foliosColumns.push(columnText)
      record["folio"+i]=record["folios"][i];
    };

delete record["folios"]
 */
          return Object.values(record)
       
        }),
   headers: ["id",
   "Calle",
   "Ronda",
   "Fecha",
   "Fecha de creacion",
   "N. Enlace",
   "Colonia",
   "folios",
   "N. Pipero",
   "Numero pipero",
   "eco",
   "placa",
   "Capacidad",
/* foliosColumns, */
        ].flat(),
       
         headersSettlements: [
"10000",
"20000",
"Pueblos y colonias",
"Total",
"Litros",


        ],
        dataSettlements:Object.values(value)[0]["settlements"].map((settlement, key) => {
          console.log("settlement",Object.values(Object.values(settlement)[0]),"key", key)
          return Object.values(Object.values(settlement)[0]);
       
        }),
        
        infoSquare: ``}
return buildFormat;
})
console.log("hojas",sheets)
 

    this.es.generateExcel(filename, sheets);
});
}
}
