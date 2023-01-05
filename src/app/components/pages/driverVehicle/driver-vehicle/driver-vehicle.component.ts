import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { driverVehicleModel } from '@app/models/driver-vehicle/driver-vehicle.module';
import { DriverVehicleService } from '@app/services/driverVehicle/driver-vehicle.service';
import { AuthService } from '@app/services/auth/auth.service';
import { UserModel } from '@app/models/user/userModel.module';
import { CatalogModel } from '@app/models/catalog/catalog.module';
import { CatalogService } from '@app/services/catalog/catalog.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-driver-vehicle',
  templateUrl: './driver-vehicle.component.html',
  styleUrls: ['./driver-vehicle.component.scss']
})
export class DriverVehicleComponent implements OnInit {


  aFormGroup: FormGroup;
  vehicle: driverVehicleModel = new driverVehicleModel();
  users: UserModel[] = [];
  cargando = false;
  blockSpecial: RegExp = /[a-z,A-Z,\s]/;
  dependencyCatalog: CatalogModel[] = [];
  capacityCatalog: CatalogModel[] = [];
  loading: boolean;

  constructor(
    private apiDriverVehicle: DriverVehicleService,
    private apiUser: AuthService,
    private apiCatalog: CatalogService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {


    this.aFormGroup = this.formBuilder.group({

      firstName: ["", [Validators.required]],
      paternalSurname: ["",],
      maternalSurname: ["",],
      phoneNumber: [, [Validators.required]],
      eco: ["", [Validators.required]],
      model: ["",],
      brand: ["",],
      capacityId: ["", [Validators.required]],
      placa: ["", [Validators.required]],
      dependencyId: ["", [Validators.required]],
    });

    this.aFormGroup.valueChanges.subscribe(data => this.onVehicleFormChange(data));

    this.apiCatalog.getcapacity().subscribe(res => {
      console.log(res);
      this.capacityCatalog = res.payload;
      this.loading = false;
    });

    this.apiCatalog.getdependency().subscribe(res => {

      this.dependencyCatalog = res.payload;
      this.loading = false;
    });

  }

  onVehicleFormChange(date) {
    this.vehicle = date;
  }

  createVehicle() {
    Swal.fire({
      title: "¿Desea Registrar la Nueva Pipa?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(this.aFormGroup.valid)
      {
        if (result.isConfirmed) {
          const formData = this.aFormGroup.value;
          formData.dependencyId = this.dependencyId.value.id;
          formData.capacityId = this.capacityId.value.id;
          formData.phoneNumber = parseInt(formData.phoneNumber) 
          this.apiDriverVehicle.createDriverVehicle(formData).subscribe(
            (resp) => {
              console.log(resp);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Pipa guardada Correctamente",
                showConfirmButton: false,
              });
              this.router.navigate(["/pipas/list"]);
              setTimeout(() => {
                window.location.reload();
              }, 1300);
            },
            (resErr) => {
              console.log(resErr);
              let message;
              if (resErr.status === 400)
                message = resErr.error.validation['body'].message
              else if (resErr.status === 500)
                message = resErr.error.message;
              else
                message = "Error de ALAN"
              Swal.fire({
                icon: "error",
                title: message,
                showConfirmButton: false,
              }).then(function () { });
            }
  
          );
        } else if (result.isDenied) {
          Swal.fire("Pipa no guardada", "", "info");
        }
      }else{
        this.validateAllFormFields(this.aFormGroup)
      }
     
    });
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        if(control.hasError)
        {
          
            console.log("invalido",control.errors)
          
        }
      
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  get firstName() {
    return this.aFormGroup.get("firstName");
  }
  get phoneNumber() {
    return this.aFormGroup.get("phoneNumber");
  }
  get eco() {
    return this.aFormGroup.get("eco");
  }
  get capacityId() {
    return this.aFormGroup.get("capacityId");
  }
  get placas() {
    return this.aFormGroup.get("placas");
  }
  get dependencyId() {
    return this.aFormGroup.get("dependencyId");
  }
  get placa() {
    return this.aFormGroup.get("placa");
  }

}
