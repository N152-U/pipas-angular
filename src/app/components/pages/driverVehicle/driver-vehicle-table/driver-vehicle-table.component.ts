import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
import { driverVehicleModel } from '@app/models/driver-vehicle/driver-vehicle.module';
import { DriverVehicleService } from '@app/services/driverVehicle/driver-vehicle.service';

@Component({
  selector: 'app-driver-vehicle-table',
  templateUrl: './driver-vehicle-table.component.html',
  styleUrls: ['./driver-vehicle-table.component.scss']
})
export class DriverVehicleTableComponent implements OnInit {

  first = 0;
  rows = 20;
  driveVehicleDate: driverVehicleModel[] = [];
  loadingTable = false;

  constructor(
    private apidriver: DriverVehicleService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this. cargar();
  }

  cargar() {
    this.loadingTable = true;
    this.apidriver.getAllDriverVehicle().subscribe(res => {
      console.log(res);
      this.driveVehicleDate = res.payload;
      this.loadingTable = false;
    });
  }

  deleteDriverVehicle(driverVehicle: driverVehicleModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Qué desea borrar la pipa  ${driverVehicle.eco}`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    } as SweetAlertOptions).then(resp => {
      if (resp.value) {
        this.driveVehicleDate.splice(i, 1);
        this.apidriver.deleteDriverVehicle(driverVehicle.id).subscribe();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Pipa eliminada correctamente",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      else if (resp.isDenied) {
        Swal.fire("Pipa no eliminada", "", "info");
      }
    });
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
    return this.driveVehicleDate ? this.first === (this.driveVehicleDate.length - this.rows) : true;
  }
  isFirstPage(): boolean {
    return this.driveVehicleDate ? this.first === 0 : true;
  }

}
