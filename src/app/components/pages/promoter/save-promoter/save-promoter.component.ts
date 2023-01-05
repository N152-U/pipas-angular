import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import {Router} from "@angular/router";
/* importamos modelos y el servicio  */
import { PromoterModel } from '@app/models/promoter/promoter.module';
import { PromoterService } from '@app/services/promoter/promoter.service';
@Component({
  selector: 'app-save-promoter',
  templateUrl: './save-promoter.component.html',
  styleUrls: ['./save-promoter.component.scss']
})
export class SavePromoterComponent implements OnInit {
   
  selectedState: any = null;
  states: any[] = [
    
    {name: 'Femenino', value: '2'},
    {name: 'Masculino', value: '1'},
    
];

   //Formulario
   aFormGroup: FormGroup;
        
   /*  Crear una variable para guardar el modulo */
   promoter: PromoterModel = new PromoterModel();
    
  constructor(private apipromoter: PromoterService, 
     private router: Router,
     private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      paternalSurname: ["", [Validators.required]],
      maternalSurname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
    });
    this.aFormGroup.valueChanges.subscribe(data => this.onPromoterFormChange(data));
  }

  onPromoterFormChange(data) {
    this.promoter = data;
    console.log(this.promoter)

  }

  PromoterCrate(form: NgForm) {
    Swal.fire({
      title: "¿Desea Registrar Nuevo Promotor?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apipromoter.CreatePromoter(this.aFormGroup.value).subscribe((resp) => {
          console.log(resp);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pipero guardado",
            showConfirmButton: false,
          });
          this.router.navigate(["/promotor"]);
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
        Swal.fire("Promotor no guardado", "", "info");
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
  get gender() {
    return this.aFormGroup.get("gender");
  }

}
