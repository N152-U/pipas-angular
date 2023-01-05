import { Component, OnInit } from "@angular/core";
/* impotar formularios y para las rutas */
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { PiperoModel } from "@app/models/pipero/pipero.module";
import { PiperoService } from "@app/services/pipero/pipero.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-edit-pipero",
  templateUrl: "./edit-pipero.component.html",
  styleUrls: ["./edit-pipero.component.scss"],
})
export class EditPiperoComponent implements OnInit {
  
  genero: any[];

  piperoGrup: FormGroup;
  loading = false;
  id!: string;
  isAddMode!: boolean;
  submitted = false;

  constructor(
    private apieditPipero: PiperoService, 
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

    this.genero = [
      { name: "Maculino", code: "1" },
      { name: "Femenino", code: "2" },
      { name: "No especifica", code: "3" },
    ];
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.piperoGrup = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      paternalSurname: ["", [Validators.required]],
      maternalSurname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
    }, FormGroup);

   
      this.apieditPipero.GetIdPipero(this.id)
     
        .subscribe(x => this.piperoGrup.patchValue(x));
   
    this.piperoGrup.valueChanges.subscribe(data => this.onPiperoFormChange(data));
  }

  onPiperoFormChange(data) {
    console.log(data);
    console.log(this.piperoGrup)

  }
  
 /*  onSubmit() {
    this.loading = true;
    if (this.isAddMode) {
      this.updatePipero();
    }
  } */
  
  updatePipero( ) {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apieditPipero.UpdatePipero(this.id, this.piperoGrup.value)
          .pipe(first())
          .subscribe(() => {Swal.fire({
            position: "center",
            icon: "success",
            title: "Pipero actualizado",
            showConfirmButton: false,
          });
          this.router.navigate(["/pipero"]);
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
        Swal.fire("Pipero no actualizado", "", "info");
      }
    });
  }
  get firstName() {
    return this.piperoGrup.get("firstName");
  }
  get paternalSurname() {
    return this.piperoGrup.get("paternalSurname");
  }
  get maternalSurname() {
    return this.piperoGrup.get("maternalSurname");
  }
  get gender() {
    return this.piperoGrup.get("gender");
  }
  
}
