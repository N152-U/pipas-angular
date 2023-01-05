import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
import { collaboratorModel } from '@app/models/collaborator/collaborator.module';
import { CollaboratorService } from '@app/services/collaborator/collaborator.service';
import { TripsService } from './../../../../services/trips/trips.service';
import { tripsModel } from '@app/models/trips/trips.module';
import { LazyLoadEvent } from 'primeng/api';
import { first } from 'rxjs/operators';
import { CatalogService } from '@app/services/catalog/catalog.service';
import { resourceLimits } from 'worker_threads';


@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {
  first = 0;
  rows = 20;
  newTrips: collaboratorModel[] = [];
  cargando = false;
  loadingTable = true;
  totalRecords: Number = 0;

  selectedStatus: any = null;

  statuses: [] = [];

  constructor(
    private apiTrip: TripsService,
    public router: Router,
    private apiCatalog: CatalogService
  ) { }

  ngOnInit(): void {
    this.cargar();
    this.apiCatalog.getStatuses().subscribe((data) => {
      this.statuses = data.payload;
    })
  }

  cargar() {
    this.cargando = true;
    this.loadTrips(null);
  }

  loadTrips(event: LazyLoadEvent) {
    console.log(event);
    if (event) {

      setTimeout(() => {
        this.loadingTable = true;
        this.apiTrip.getTotalRegisters(event.first, event.rows, event.filters["collaborator.firstName"]?.value, event.filters["settlement.settlement"]?.value, event.filters["street"]?.value, event.filters["statuses.name"]?.value, event.filters["created_at"]?.value).subscribe(res => {
          this.totalRecords = res.payload;
        });
        this.apiTrip.getAllTrips(event.first, event.rows, event.filters["collaborator.firstName"]?.value, event.filters["settlement.settlement"]?.value, event.filters["street"]?.value, event.filters["statuses.name"]?.value, event.filters["created_at"]?.value).subscribe(res => {
          this.newTrips = res.payload;
          console.log(res.payload)
          this.loadingTable = false;
          /*  console.log(event.filters["collaborator.firstName"]?.value)
           console.log(event.filters["settlement.settlement"]?.value)
           console.log( event.filters["street"]?.value)
           console.log(event.filters["statuses.name"]?.value)
           console.log("Fecha para busqueda",event.filters["created_at"]?.value) */
        });
      }, 1000);
    }


  }

  unassignTrip(tripsModel: tripsModel, i: number) {
    Swal.fire({
      title: '¿Está seguro que desea remover la pipa ?',
      icon: 'question',
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
        })
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

  concludeTrip(tripsModel: tripsModel, i: number) {
    Swal.fire({
      title: '¿Está seguro finalizar el viaje ?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    } as SweetAlertOptions).then(resp => {
      if (resp.value) {
        this.newTrips.splice(i, 1);
        this.apiTrip.concludeTrip(tripsModel.id, {}).subscribe();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Viaje concluido correctamente",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else if(resp.isDenied){
        Swal.fire("Viaje no concluido");
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
        this.newTrips.splice(i, 1);
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
      } else if (result.isDenied) {
        Swal.fire("Pre-registro no eliminado");
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
    return this.newTrips ? this.first === (this.newTrips.length - this.rows) : true;
  }
  isFirstPage(): boolean {
    return this.newTrips ? this.first === 0 : true;
  }

}
