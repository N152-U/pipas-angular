import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { driverVehicleModel } from '@app/models/driver-vehicle/driver-vehicle.module';
import { DriverVehicleService } from '@app/services/driverVehicle/driver-vehicle.service';
import { CatalogModel } from '@app/models/catalog/catalog.module';
import { CatalogService } from '@app/services/catalog/catalog.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-edit-driver-vehicle',
  templateUrl: './edit-driver-vehicle.component.html',
  styleUrls: ['./edit-driver-vehicle.component.scss']
})
export class EditDriverVehicleComponent implements OnInit {

  id: string;
  aFormGroup: FormGroup;
  blockSpecial: RegExp = /[a-z,A-Z,\s]/ ;
  dependencyCatalog: CatalogModel[] = [];
  capacityCatalog: CatalogModel[] = [];
  
  loading: boolean;
   
  constructor(
    private apiDriver: DriverVehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private apiCatalog: CatalogService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.aFormGroup = this.formBuilder.group({

      firstName: ["", [Validators.required]],
      paternalSurname: ["", [Validators.required]],
      maternalSurname: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      eco: ["", [Validators.required]],
      model: ["", [Validators.required]],
      brand: ["", [Validators.required]],
      capacityId: ["", [Validators.required]],
      placa: ["", [Validators.required]],
      dependencyId: ["", [Validators.required]],

    }, FormGroup);

    this.apiDriver.getByIdDriverVehicle(this.id)
      .subscribe(data => {this.aFormGroup.patchValue(data);
        console.log("Edicion vehiculo",data)
        this.aFormGroup.get("firstName").setValue(data.firstName);
        this.aFormGroup.get("paternalSurname").setValue(data.paternalSurname);
        this.aFormGroup.get("maternalSurname").setValue(data.maternalSurname);
        this.aFormGroup.get("phoneNumber").setValue(data.phoneNumber);
        this.aFormGroup.get("eco").setValue(data.eco);
        this.aFormGroup.get("model").setValue(data.model);
        this.aFormGroup.get("brand").setValue(data.brand);
        this.aFormGroup.get("dependencyId").setValue(data.dependencyId);
        this.aFormGroup.get("capacityId").setValue(data.capacityId);
      });
    this.aFormGroup.valueChanges.subscribe(data => this.onDriverVehicleFormChange(data));
    
    this.apiCatalog.getcapacity().subscribe(res => {
      console.log(res);
      this.capacityCatalog= res.payload;
      this.loading = false;
    });

    this.apiCatalog.getdependency().subscribe(res => {
      console.log(res);
      this.dependencyCatalog = res.payload;
      this.loading = false;
    });
  }

  onDriverVehicleFormChange(data) {

  }

  updateDriverVehicle() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
     
        if (result.isConfirmed) {
          const formData = this.aFormGroup.value;
          formData.dependencyId = formData.dependencyId.id;
          formData.capacityId = formData.capacityId.id;
          this.apiDriver.updateDriverVehicle(this.id, this.aFormGroup.value)
            .pipe(first())
            .subscribe(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Pipa actualizada",
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
                message = "Error del Servidor"
              Swal.fire({
                icon: "error",
                title: message,
                showConfirmButton: false,
              }).then(function () { });
            }
            );
        } else if (result.isDenied) {
          Swal.fire("Pipa no actualizada", "", "info");
        }
      
    
    });
  }

  get firstName() {
    return this.aFormGroup.get("firstName");
  }
  get paternalSurname() {
    return this.aFormGroup.get("paternalSurname");
  }
  get maternalSurname() {
    return this.aFormGroup.get("maternalSurname");
  }
  get phoneNumber() {
    return this.aFormGroup.get("phoneNumber");
  }
  get eco() {
    return this.aFormGroup.get("eco");
  }

  get brand()
  {
    return this.aFormGroup.get("brand");
  }
  get model()
  {
    return this.aFormGroup.get("model");
  }

  get placa() {
    return this.aFormGroup.get("placa");
  }

  get dependencyId() {
    return this.aFormGroup.get("dependencyId");
  }

  get capacityId() {
    return this.aFormGroup.get("capacityId");
  }



}
