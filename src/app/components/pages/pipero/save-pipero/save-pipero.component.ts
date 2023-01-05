import { Component, OnInit } from '@angular/core';
/* impotar formularios y para las rutas */
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import {Router} from "@angular/router";
/* importamos modelos y el servicio  */
import { PiperoModel } from '@app/models/pipero/pipero.module';
import { PiperoService } from '@app/services/pipero/pipero.service';
@Component({
  selector: 'app-save-pipero',
  templateUrl: './save-pipero.component.html',
  styleUrls: ['./save-pipero.component.scss']
})


export class SavePiperoComponent implements OnInit {

  state: any[] = [
    
    {gender: 'Femenino', value: '2'},
    {gender: 'Masculino', value: '1'},
    {gender: 'Otro', value: '3'},
    
];

//Formulario
aFormGroup: FormGroup;

    /*  Crear una variable para guardar el modulo */
    pipero: PiperoModel = new PiperoModel();

  constructor(private apipipero : PiperoService, 
    private formBuilder: FormBuilder,
     private router: Router) { }

  ngOnInit(): void { 
    this.aFormGroup = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      paternalSurname: ["", [Validators.required]],
      maternalSurname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
    });
    this.aFormGroup.valueChanges.subscribe(data => this.onPiperoFormChange(data));
  }

  onPiperoFormChange(data) {
    this.pipero = data;
    console.log(this.pipero)

  }
  
   /*   Funcion PiperoCreate */
   PiperoCreate(form: NgForm) {
    Swal.fire({
      title: "¿Desea Registrar Nuevo Pipero?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apipipero.CreatePipero(this.aFormGroup.value).subscribe((resp) => {
          console.log(resp);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pipero guardado",
            showConfirmButton: false,
          });
          this.router.navigate(["/pipero"]);
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
          
        });
      } else if (result.isDenied) {
        Swal.fire("Pipero no guardado", "", "info");
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
