import { DeliveryDetailComponent } from './../delivery-detail/delivery-detail.component';
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable linebreak-style */
import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
/* Modelo y Servio */
import { DeliveryDetailModel } from '@app/models/delivery-detail/delivery-detail.module';
import { DeliveryDetailService } from '@app/services/delivery-detail/delivery-detail.service';
import { DeliveryModel } from '@app/models/delivery/delivery.module';
import { DeliveryService } from '@app/services/delivery/delivery.service';

@Component({
  selector: 'app-table-delivery-detail',
  templateUrl: './table-delivery-detail.component.html',
  styleUrls: ['./table-delivery-detail.component.scss']
})
export class TableDeliveryDetailComponent implements OnInit {

   /* PrimeNG-table */
  delivery: DeliveryDetailModel[];
  cargando: boolean;
  first = 0;
  rows = 10;

  constructor(private apiDeliveryDetail: DeliveryDetailService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.cargar();

  }

  cargar() {

    /* GetallDeliveryDetail: funcion va dentro del void  */
    this.cargando = true;
    this.apiDeliveryDetail.GetallDeliveryDetail().subscribe(res => {
      console.log(res);
      this.delivery = res.payload;
      this.cargando = false;
    });

  }

  /*  DeleteDeliveriDetail */
  DeleteDeliveriDetail(delivery: DeliveryDetailModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea eliminar el viaje con No. de Folio ${delivery.id}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    } as SweetAlertOptions).then(resp => {

      if (resp.value) {
        this.delivery.splice(i, 1);
        this.apiDeliveryDetail.DeleteDeliveryDetail(delivery.id).subscribe();
        Swal.fire(
          'Viaje eliminado correctamente',
          'success'
        )
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }



}