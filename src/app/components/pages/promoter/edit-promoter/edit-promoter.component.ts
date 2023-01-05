import { getByIdUser } from './../../../../models/user/getByIdUser.module';
import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { PromoterModel } from '@app/models/promoter/promoter.module';
import { PromoterService } from '@app/services/promoter/promoter.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-promoter',
  templateUrl: './edit-promoter.component.html',
  styleUrls: ['./edit-promoter.component.scss']
})
export class EditPromoterComponent implements OnInit {
  public genders = [
    { id: 1, name: "Masculino", value:1 },
    { id: 2, name: "Femenino", value:2  },
    { id: 3, name: "No especifica", value:3  }
  ];
  promoterGrup: FormGroup;
  loading = false;
  id!: string;
  isAddMode!: boolean;
  submitted = false;

  constructor(
    private apieditPromoter: PromoterService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.promoterGrup = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      paternalSurname: ["", [Validators.required]],
      maternalSurname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
    }, FormGroup);

    
      this.apieditPromoter.GetIdPromoter(this.id)
        
        .subscribe(x => this.promoterGrup.patchValue(x));
 
    this.promoterGrup.valueChanges.subscribe(data => this.onPromoterFormChange(data));

  }

  onPromoterFormChange(data) {
    console.log(data);
    console.log(this.promoterGrup)

  }

 /*  onSubmit() {
    this.loading = true;
    if (this.isAddMode) {
      this.updatePromoter();
    }
  }
 */

  updatePromoter() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apieditPromoter.UpdatePromoter(this.id, this.promoterGrup.value)
          .pipe(first())
          .subscribe(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Promotor actualizado",
              showConfirmButton: false,
            });
            this.router.navigate(["/promotor"]);
            setTimeout(() => {
              window.location.reload();
            }, 1300);
          });
      } else if (result.isDenied) {
        Swal.fire("Pipero no actualizado", "", "info");
      }
    });
  }
  get firstName() {
    return this.promoterGrup.get("firstName");
  }
  get paternalSurname() {
    return this.promoterGrup.get("paternalSurname");
  }
  get maternalSurname() {
    return this.promoterGrup.get("maternalSurname");
  }
  get gender() {
    return this.promoterGrup.get("gender");
  }
}
