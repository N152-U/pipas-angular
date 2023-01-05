import { ChartModel } from './../../../models/charts/charts.module';
import { ChartsService } from './../../../services/charts/charts.service';
/* impotar formularios y para las rutas */
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ChartModule} from 'primeng/chart';
/* importamos modelos y el servicio  */
import { DeliveryModel } from '@app/models/delivery/delivery.module';
import { DeliveryService } from '@app/services/delivery/delivery.service';
import { PromoterModel } from '@app/models/promoter/promoter.module';
import { PromoterService } from '@app/services/promoter/promoter.service';
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



declare var $: any;

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

  
  /* GetallTankerTruck guarda las variables */

  chartData: ChartModel[] = [];
  cargando = false;

  cols: any[];

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private ps: NgxPermissionsService,
    private rs: NgxRolesService,
    private http: HttpClient,
    private apidelivery:DeliveryService,
    private apipromoter:PromoterService,
    private apicharts: ChartsService, 
  ) {
    


  }
  
  permissions$ = this.ps.permissions$;
  roles$ = this.rs.roles$;

  ngOnInit(): void {
    
  }
 
  ngAfterViewInit(): void {
    this.renderer.listen("document", "click", (event) => {
      if (event.target.hasAttribute("view-link-id")) {
        if (isDevMode()) console.log(event);
      }
    });


    this.apicharts.getTotalLiters().subscribe((res) => {
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
    });

    this.apicharts.getMunicipalityLitersTotal().subscribe((res) => {
      console.log("litros municipo",res);

      this.chartData = res.paylad;
      this.municipalityTotalLitersRef.buildMunicipalityTotalLiters(
        res.payload,
   /*      [{
          "name": "Monica",
          "steps": 140,         
        },{
          "name": "Joey",
          "steps": 150,          
      },{
          "name": "Bety",
          "steps": 130,          
      },{
        "name": "Jose",
        "steps": 130,          
      } */
       'municipality' , 'municipalityTotalLiters',
      
      );   
      console.log("litros municipo 2", res.payload);
    });
   


  
  }

  ngOnDestroy() {

  }



}
