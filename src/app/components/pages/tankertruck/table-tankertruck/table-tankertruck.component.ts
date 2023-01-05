import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { TankerTruckModel } from '@app/models/tankertruck/tankertruck.module';
import { TankertruckService } from '@app/services/tankertruck/tankertruck.service';
import { EditTankertruckComponent } from '../edit-tankertruck/edit-tankertruck.component';


@Component({
  selector: 'app-table-tankertruck',
  templateUrl: './table-tankertruck.component.html',
  styleUrls: ['./table-tankertruck.component.scss']
})
export class TableTankertruckComponent implements OnInit {

  //Paginador

  first = 0;
  rows = 10;

  /* GetallTankerTruck guarda las variables */

  TankerTruckDate: TankerTruckModel[] = [];
  cargando = false;

  /*  Crear una variable para guardar el modulo */
  TankerTruckM: TankerTruckModel = new TankerTruckModel();

  constructor(
    private apitanker: TankertruckService, 
    public router: Router) { }

  ngOnInit(): void {


    this.getTankerTruck();

  }
  getTankerTruck() {

    /* GetallTankerTruck: funcion va dentro del void  */
    this.cargando = true;
    this.apitanker.GetallTankerTruck().subscribe(res => {
      console.log(res);
      this.TankerTruckDate = res.payload;
      this.cargando = false;
    });

  }

  /*  Delete EditTankertruckComponent */
  DeleteTankerTruck(TankerTruck: TankerTruckModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar la pipa modelo ${TankerTruck.brand}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    } as SweetAlertOptions).then(resp => {

      if (resp.value) {
        this.TankerTruckDate.splice(i, 1);
        this.apitanker.DeleteTankerTruck(TankerTruck.id).subscribe();
        Swal.fire(
          'Pipa eliminada correctamente',
          'success'
        )
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

 /* FUNCION EditTankertruck */

 EEditTankertruck(tanker:TankerTruckModel):void{
  localStorage.setItem("id",tanker.id.toString());
  this.router.navigate(["edit"]);
}

//Paginador
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
  return this.TankerTruckDate ? this.first === (this.TankerTruckDate.length - this.rows) : true;
}

isFirstPage(): boolean {
  return this.TankerTruckDate ? this.first === 0 : true;
}



}
