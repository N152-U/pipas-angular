import { getByIdUser } from './../../../../models/user/getByIdUser.module';
import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { TankerTruckModel } from '@app/models/tankertruck/tankertruck.module';
import { TankertruckService } from '@app/services/tankertruck/tankertruck.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-tankertruck',
  templateUrl: './edit-tankertruck.component.html',
  styleUrls: ['./edit-tankertruck.component.scss']
})
export class EditTankertruckComponent implements OnInit {

  tankertruckGrup: FormGroup;
  loading = false;
  id: string;
  
  /*   isAddMode!: boolean; */
  /* submitted = false; */

  constructor(
    private apieditTankertruck: TankertruckService, 
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.tankertruckGrup = this.formBuilder.group({
      brand: ["", [Validators.required]],
      model: ["", [Validators.required]],
      placa: ["", [Validators.required]],
      eco: ["", [Validators.required]],
      capacity: ["", [Validators.required]],
    }, FormGroup);

    
      this.apieditTankertruck.GetIdTankerTruck(this.id)
       
        .subscribe(x => this.tankertruckGrup.patchValue(x));
  
    this.tankertruckGrup.valueChanges.subscribe(data => this.ontankertruckFormChange(data));
   
  }

  ontankertruckFormChange(data) {
    console.log(data);
    console.log(this.tankertruckGrup)

  }
  //UPDATE Y CREATE EN L MISMO COMPONENTE

  /* onSubmit() {
    this.loading = true;
    if (this.isAddMode) {
      this.updateTankertruck();
    }else{
      this.createTankertruck();
    }
  }
 */
  updateTankertruck() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apieditTankertruck.UpdateTankerTruck(this.id, this.tankertruckGrup.value)
        .pipe(first())
        .subscribe(() =>{ Swal.fire({
            position: "center",
            icon: "success",
            title: "Pipa actualizado",
            showConfirmButton: false,
          });
          this.router.navigate(["/tankertruck"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        },
          (resErr) => {
            console.log(resErr)

            Swal.fire({
              icon: "error",
              title: resErr.error.message,
              showConfirmButton: false,
            }).then(function () {
            });
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Pipa no actualizado", "", "info");
      }
    });
  }

  get brand() {
    return this.tankertruckGrup.get("brand");
  }
  get model() {
    return this.tankertruckGrup.get("model");
  }
  get placa() {
    return this.tankertruckGrup.get("placa");
  }
  get eco() {
    return this.tankertruckGrup.get("eco");
  }
  get capacity() {
    return this.tankertruckGrup.get("capacity");
  }


}
