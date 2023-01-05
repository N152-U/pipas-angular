import { CatalogService } from '@app/services/catalog/catalog.service';
import { ChartModel } from './../../../models/charts/charts.module';
import { ChartsService } from './../../../services/charts/charts.service';
/* impotar formularios y para las rutas */
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ChartModule} from 'primeng/chart';
/* importamos modelos y el servicio  */
import { collaboratorModel } from '@app/models/collaborator/collaborator.module';
import { CollaboratorService } from '@app/services/collaborator/collaborator.service';
import { TripsService } from '@app/services/trips/trips.service';
import { tripsModel } from '@app/models/trips/trips.module';
import { LazyLoadEvent } from 'primeng/api';


import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { Router } from "@angular/router";
/* import { single } from '../../../assets/json/data'; */

import { ViewChild } from "@angular/core";
import { SortEvent } from "primeng/api";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";

import * as xml2js from "xml2js";

import Swal, { SweetAlertOptions } from 'sweetalert2';

import * as moment from 'moment';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { isThisTypeNode } from 'typescript';
import { array } from '@amcharts/amcharts4/core';



declare var $: any;

const exp = /^EXT-/g;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('litersofwater') litersofwaterRef;
  @ViewChild('peopleServed') peopleServedRef;
  @ViewChild('piperpoService') piperpoServiceRef;
  @ViewChild('municipalityTotalLiters') municipalityTotalLitersRef;
  @ViewChild('tipsDay') tipsDayRef;

  

  
  data: any;    
  options: any;

  /* rm -rf node_modules/
  npm cache clear
  npm install

  npm install jquery --save

npm install datatables.net --save

npm install datatables.net-dt --save

npm install angular-datatables --save

npm install @types/jquery --save-dev

npm install @types/datatables.net --save-dev

npm install bootstrap --save

https://github.com/xbox2204/SpringBoot-JPA-Swagger-Angular/blob/master/app/Angular/src/app/book-list/book-list.component.ts
 */
  /* Para datepicker

https://valor-software.com/ngx-bootstrap/#/datepicker#min-mode
 */
  datePickerValue: Date = new Date();
  dateRangePickerValue: Date[];
  minMode: BsDatepickerViewMode = "year";
  minDate: Date = new Date(2009, 0);
  maxDate: Date = new Date();
  datePickerInvalidState: boolean;
  datePickerInvalidText: string;
  loadingButton: boolean;
  bsConfig: Partial<BsDatepickerConfig>;
  progressPercent: number;
  first = 0;
  rows = 20;
  newTrips: collaboratorModel[] = [];
  trips : any;
  /* GetallTankerTruck guarda las variables */
  chartData: ChartModel[] = [];
  cargando = false;
  cols: any[];
  loadingTable=true;
  totalRecords:Number=0;
  totalPipe: number;
  totalTrip: number;
  totalLiter: number;

  selectedStatus:any=null;

  statuses:[]=[];

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private ps: NgxPermissionsService,
    private rs: NgxRolesService,
    private http: HttpClient,
    private apicharts: ChartsService, 
    private apiCollaborator: CollaboratorService,
    private apiTrip: TripsService,
    private apiCatalog: CatalogService
  ) {
    


  }
  
  permissions$ = this.ps.permissions$;
  roles$ = this.rs.roles$;

  ngOnInit(): void {
    this.apiCatalog.getStatuses().subscribe((data)=>
    {
      this.statuses=data.payload;
    })
  }
 
  ngAfterViewInit(): void {
    this.renderer.listen("document", "click", (event) => {
      if (event.target.hasAttribute("view-link-id")) {
        if (isDevMode()) console.log(event);
      }
    });
  
    this.apiTrip.getCountVehicle().subscribe((res) => {
      this.totalPipe = res.payload; 
     
    });
    
    this.apiTrip.getCountTripsDaily().subscribe((res) => {
      console.log("totalViajes",res);
      this.totalTrip = res.payload; 
    });

    this.apiTrip.getTotalLitersDaily().subscribe((res) => {
      console.log("totalLitros",res);
      this.chartData = res.payload;
      this.totalLiter = res.payload;
      this.litersofwaterRef.buildPictorial(this.chartData);     
    });

    /* this.apicharts.getTotalLiters().subscribe((res) => {
      console.log("total",res);
      this.chartData = res.payload;
      this.litersofwaterRef.buildPictorial(this.chartData[0].litersOfWater);     
    });

    this.apicharts.getPeopleServed().subscribe((res) => {
      console.log("totalpersonas",res);
      this.chartData = res.payload;
      this.peopleServedRef.buildPictorialPeople(  res.payload, 'municipality' , 'totalpeople');   
      console.log("totalpersonas", res.payload);  
    
    });

    this.apicharts.getPiperoTrips().subscribe((res) => {
      console.log("viajes Pipero",res);

      this.chartData = res.paylad;
      this.piperpoServiceRef.buildpiperpoServiceRef(
      res.payload, 'pipero_firstName' , 'tripsPipero' );   
      console.log("total viajes 2", res.payload);  
    });

    this.apicharts.getTripsDeliveriDetail().subscribe((res) => {
      console.log("total viajes por dias",res);
      this.chartData = res.payload;
      this.tipsDayRef.dateTripsMunicipality(res.payload, 'createAtnew', 'count','value'  );     
    }); */

   /*  this.apicharts.getMunicipalityLitersTotal().subscribe((res) => {
      console.log("litros municipo",res);

      this.chartData = res.paylad;
      this.municipalityTotalLitersRef.buildMunicipalityTotalLiters(
        res.payload,
       'municipality' , 'municipalityTotalLiters',
      
      );   
      console.log("litros municipo 2", res.payload);
    }); */
  
  }

  getDaily(event: LazyLoadEvent){
    console.log(event);
    if(event)
    {
      
      setTimeout(() => {
        this.loadingTable = true;
        this.apiTrip.getTotalDetailRegisters(event.first, event.rows, event.filters["collaborator.firstName"]?.value, event.filters["settlement.settlement"]?.value,event.filters["street"]?.value, event.filters["statuses.name"]?.value).subscribe(res => {
          this.totalRecords=res.payload;
        });
        this.apiTrip.getAllDaily(event.first, event.rows, event.filters["collaborator.firstName"]?.value, event.filters["settlement.settlement"]?.value, event.filters["street"]?.value, event.filters["statuses.name"]?.value).subscribe(res => {
          this.trips = res;
          console.log( "viajes", res)
          console.log("colabradorFiltro",event.filters["collaborator.firstName"]?.value)
          console.log("vajes", this.trips)
          this.loadingTable = false;
        });
      }, 1000);
    }
  }

  cargar() {
    this.getDaily(null);
    this.cargando = true;
  }

  unassignTrip(tripsModel: tripsModel, i: number) {
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro que desea remover la pipa ?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    } as SweetAlertOptions).then(resp => {
      if (resp.value) {
        this.newTrips.splice(i, 1);
        this.apiTrip.unassignTrip(tripsModel.id, {}).subscribe();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Pipa removida ",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else if (resp.isDenied) {
        Swal.fire("Pipa no removida", "", "info");
      }
    });
  }

 concludeTrip(tripsModel: tripsModel, i: number) {
    Swal.fire({
      icon: "question",
      title: '¿Está seguro de finalizar el viaje?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    } as SweetAlertOptions).then(result => {
      if (result.isConfirmed) {
        this.newTrips.splice(i, 1);
        this.apiTrip.concludeTrip(tripsModel.id, {}).subscribe();
        Swal.fire({
          icon: 'success',
          title: 'Viaje Finalizado',
          showConfirmButton: false,
          timer: 1300
        })
        setTimeout(() => {
          window.location.reload();
        }, 1500); 
      }else if (result.isDenied) {
        Swal.fire("Viaje no terminado", "", "info");
      }
    });
  }

  delete(tripModel: tripsModel, i: number) {
    Swal.fire({
      title: `¿Está seguro que desea borrar el viaje?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.trips.splice(i, 1);
        this.apiTrip.deleteTrips(tripModel.id).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pre-registro eliminado correctamente",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      }else if (result.isDenied) {
        Swal.fire("Pre-registro no eliminado", "", "info");
      }
    });
  }
  
  ngOnDestroy() {

  }

  next() {
    this.first = this.first + this.rows;
  }
  prev() {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.newTrips ? this.first === (this.newTrips.length - this.rows) : true;
  }
  isFirstPage(): boolean {
    return this.newTrips ? this.first === 0 : true;
  }



}
