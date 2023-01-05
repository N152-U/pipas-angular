
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { collaboratorModel } from "@app/models/collaborator/collaborator.module";
import { CollaboratorService } from "@app/services/collaborator/collaborator.service";
import { SettlementModel } from './../../../../models/settlement/settlement.module';
import { CatalogService } from "@app/services/catalog/catalog.service";
import { CatalogModel } from "@app/models/catalog/catalog.module";
import { UserModel } from '@app/models/user/userModel.module';
import Swal from "sweetalert2";
import { NUMBER } from "@amcharts/amcharts4/core";
@Component({
  selector: "app-collaborator",
  templateUrl: "./collaborator.component.html",
  styleUrls: ["./collaborator.component.scss"],
})
export class CollaboratorComponent implements OnInit {
  
  public selectSettlemet;
  aFormGroup: FormGroup;
  leader: collaboratorModel = new collaboratorModel();
  public settlement: SettlementModel[] = [];
  loading: boolean;
  users: UserModel[] = [];
  blockSpecial: RegExp = /[a-z,A-Z,\s]/ ;
  selectedCountries1: string[] = [];
  

  constructor(
    private apiLeaders: CollaboratorService,
    private router: Router,
    private apiCatalog: CatalogService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {


    this.aFormGroup = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      maternalSurname: ["", ],
      paternalSurname: ["", ],
      settlementsId: ["", [Validators.required]],
    });

    this.aFormGroup.valueChanges.subscribe((data) =>
      this.onLeaderFormChange(data)
    );

    this.loading = true;
    this.apiCatalog.getSettlement().subscribe(res => {
      console.log(res);
      this.settlement = res.payload;
      this.loading = false;
    });
  }

  onLeaderFormChange(data) {
    this.leader = data;
  }


  createLeaders() {
    Swal.fire({
      title: "¿Desea Registrar un Nuevo Enlace?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(this.aFormGroup.valid){
        if (result.isConfirmed) {
          const formData = this.aFormGroup.value;
          console.log("formulario",formData);
          formData.settlementsId = this.settlementsId.value.map(value => value.id);
  
          console.log("formulario",formData);
          this.apiLeaders.createCollaborator(this.aFormGroup.value).subscribe(
            (resp) => {
              console.log(resp);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Colaborador guardado Correctamente",
                showConfirmButton: false,
              });
              this.router.navigate(["/enlace/list"]);
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
          Swal.fire("Colaborador no guardado", "", "info");
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

  
  enlaceChanged() {

  }

  get firstName() {
    return this.aFormGroup.get("firstName");
  }
  get settlementsId() {
    return this.aFormGroup.get("settlementsId");
  }
  get phoneNumber() {
    return this.aFormGroup.get("phoneNumber");
  }
  get municipality() {
    return this.aFormGroup.get("municipality");
  }
}
