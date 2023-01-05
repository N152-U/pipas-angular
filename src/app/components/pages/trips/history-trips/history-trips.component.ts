import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
import { TripsService } from '@app/services/trips/trips.service';
import { tripsModel } from '@app/models/trips/trips.module';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-history-trips',
  templateUrl: './history-trips.component.html',
  styleUrls: ['./history-trips.component.scss']
})
export class HistoryTripsComponent implements OnInit {

  first = 0;
  rows = 20;
  tripsDate: tripsModel[] = [];
  cargando = false;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  constructor(

    private apiTrips: TripsService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.cargar();
    
  }
  
  public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('control.pdf');
  }

  cargar() {
    this.cargando = true;
 /*    this.apiTrips.getAllTrips().subscribe(res => {
      this.tripsDate = res.payload;
      this.cargando = false;
    }); */
  }

  deleteTrips(trips: tripsModel, i: number) {
    Swal.fire({
      title: '¿Está seguro qué desea borrrar el viaje?',
    /*   text: `¿Qué desea borrar el Viaje ${trips.firstName}?`, */
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    } as SweetAlertOptions).then(resp => {
      if (resp.value) {
        this.tripsDate.splice(i, 1);
        this.apiTrips.deleteTrips(trips.id).subscribe();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Viaje eliminado correctamente",
          showConfirmButton: false,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

  editDriverVehicle(trips: tripsModel): void {
    localStorage.setItem("id", trips.id.toString());
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
    return this.tripsDate ? this.first === (this.tripsDate.length - this.rows) : true;
  }
  isFirstPage(): boolean {
    return this.tripsDate ? this.first === 0 : true;
  }


}
