import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { DeliveryService } from '@app/services/delivery/delivery.service';
import { DeliveryModel } from '@app/models/delivery/delivery.module';

@Component({
  selector: 'app-table-delivery',
  templateUrl: './table-delivery.component.html',
  styleUrls: ['./table-delivery.component.scss']
})
export class TableDeliveryComponent implements OnInit {

  DeliveryDate: DeliveryModel[] = [];
  cargando = false;
  
  constructor(
    private apidelivery: DeliveryService, 
    public router: Router) { }

  ngOnInit(): void {

    this.getdelivery();

  }

  getdelivery() {

 
    this.cargando = true;
    this.apidelivery.GetallDelivery().subscribe(res => {
      console.log(res);
      this.DeliveryDate = res.payload;
      this.cargando = false;
    });

  }

  DeleteDelivery(delivery: DeliveryModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea eliminar el Viaje  ${delivery.promoterId}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    } as SweetAlertOptions).then(resp => {

      if (resp.value) {
        this.DeliveryDate.splice(i, 1);
        this.apidelivery.DeleteDelivery(delivery.id).subscribe();
        Swal.fire(
          'El Viaje se eliminado correctamente',
          'success'
        )
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

}
