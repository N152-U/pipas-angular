import { getByIdUser } from './../../../../models/user/getByIdUser.module';
import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { PiperoModel } from '@app/models/pipero/pipero.module';
import { PiperoService } from '@app/services/pipero/pipero.service';

@Component({
  selector: 'app-table-pipero',
  templateUrl: './table-pipero.component.html',
  styleUrls: ['./table-pipero.component.scss']
})
export class TablePiperoComponent implements OnInit {



  piperoData: PiperoModel[];
  selectedCustomer1: PiperoModel;


  first = 0;

  rows = 10;


  /* GetallPipero guarda las variables */

  piperosData: PiperoModel[] = [];
  cargando = false;

  /*  Crear una variable para guardar el modulo */
  piperoM: PiperoModel = new PiperoModel();


  constructor(private apipipero: PiperoService, public router: Router) { }

  ngOnInit(): void {
    null

    this.getallPM();

  }
  getallPM() {

    this.cargando = true;
    this.apipipero.GetallPipero().subscribe(res => {
      console.log(res);
      this.piperoData = res.payload;
      this.cargando = false;
    });

  }

  /*  DeletePipero */
  DeletePipero(piperoM: PiperoModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar al pipero ${piperoM.firstName}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    } as SweetAlertOptions).then(resp => {

      if (resp.value) {
        this.piperosData.splice(i, 1);
        this.apipipero.DeletePipero(piperoM.id).subscribe();
        Swal.fire(
          'Pipero eliminado correctamente',
          'success'
        )
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

  /* FUNCION EditPiero */

  EditPiero(piperoM: PiperoModel): void {
    localStorage.setItem("id", piperoM.id.toString());
    this.router.navigate(["edit"]);
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
    return this.piperoData ? this.first === (this.piperoData.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.piperoData ? this.first === 0 : true;
  }

  /* Vista Emergente */


}
