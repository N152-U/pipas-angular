import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { PromoterModel } from '@app/models/promoter/promoter.module';
import { PromoterService } from '@app/services/promoter/promoter.service';

@Component({
  selector: 'app-table-promoter',
  templateUrl: './table-promoter.component.html',
  styleUrls: ['./table-promoter.component.scss']
})
export class TablePromoterComponent implements OnInit {
   //Paginador

   first = 0;
   rows = 10;

   /* GetallPromoter guarda las variables */

   promoterDate: PromoterModel[] = [];
   cargando = false;
 
   /*  Crear una variable para guardar el modulo */
   promoterM: PromoterModel = new PromoterModel();

  constructor(private apipromoter: PromoterService, public router: Router) { }

  ngOnInit(): void { null 

    this.cargar();


  }
  
  cargar() {

    this.cargando = true;
    this.apipromoter.GetallPromoter().subscribe(res => {
      console.log(res);
      this.promoterDate = res.payload;
      this.cargando = false;
    });

  }

  /*  DeletePromoter */
  DeletePromoter(promoter: PromoterModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar al promotor ${promoter.firstName}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    } as SweetAlertOptions).then(resp => {

      if (resp.value) {
        this.promoterDate.splice(i, 1);
        this.apipromoter.DeletePromoter(promoter.id).subscribe();
        Swal.fire(
          'Promotor eliminado correctamente',
          'success'
        )
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

 /* FUNCION EditPromter */

 EditPromoter(promoter:PromoterModel):void{
  localStorage.setItem("id",promoter.id.toString());
  this.router.navigate(["edit"]);
  }

 /* Paginador */
 
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
  return this.promoterDate ? this.first === (this.promoterDate.length - this.rows) : true;
}

isFirstPage(): boolean {
  return this.promoterDate ? this.first === 0 : true;
}


}
