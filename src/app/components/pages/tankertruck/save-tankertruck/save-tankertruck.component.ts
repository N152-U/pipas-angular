import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import {Router} from "@angular/router";
/* importamos modelos y el servicio  */
import { TankerTruckModel } from '@app/models/tankertruck/tankertruck.module';
import { TankertruckService } from '@app/services/tankertruck/tankertruck.service';
@Component({
  selector: 'app-save-tankertruck',
  templateUrl: './save-tankertruck.component.html',
  styleUrls: ['./save-tankertruck.component.scss']
})
export class SaveTankertruckComponent implements OnInit {
  
  //Formulario
  aFormGroup: FormGroup;
  /*  Crear una variable para guardar el modulo */
  TankerTruck: TankerTruckModel = new TankerTruckModel();

  constructor(private apitanker: TankertruckService,
    private formBuilder: FormBuilder,
      private router: Router) { }

  ngOnInit(): void {

    this.aFormGroup = this.formBuilder.group({
      brand: ["", [Validators.required]],
      model: ["", [Validators.required]],
      placa: ["", [Validators.required]],
      eco: ["", [Validators.required]],
      capacity: ["", [Validators.required]],
    });
    this.aFormGroup.valueChanges.subscribe(data => this.onTankerTruckFormChange(data));

  }

  onTankerTruckFormChange(data) {
    this.TankerTruck = data;
    console.log(this.TankerTruck)

  }


  /*   Funcion TankerTruckCreate */
  TankerTruckCreate(form: NgForm) {
    Swal.fire({
      title: "¿Desea Registrar Nueva Pipa?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apitanker.CreateTankerTruck(this.aFormGroup.value).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pipa guardada",
            showConfirmButton: false,
          });
          this.router.navigate(["/tankertruck"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        },
        (resErr)=>{
          console.log(resErr)

          Swal.fire({
              icon: "error",
            title:resErr.error.message,
            showConfirmButton: false,
          }).then(function () {

          });   
          
        }
        );
      } else if (result.isDenied) {
        Swal.fire("Pipa no guardado", "", "info");
      }
    });
  }

  get brand() {
    return this.aFormGroup.get("brand");
  }
  get model() {
    return this.aFormGroup.get("model");
  }
  get placa() {
    return this.aFormGroup.get("placa");
  }
  get eco() {
    return this.aFormGroup.get("eco");
  }
  get capacity() {
    return this.aFormGroup.get("capacity");
  }

}
