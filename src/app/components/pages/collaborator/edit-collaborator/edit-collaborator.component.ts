import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorService } from '@app/services/collaborator/collaborator.service';
import { collaboratorModel } from '@app/models/collaborator/collaborator.module';
import { SettlementModel } from './../../../../models/settlement/settlement.module';
import { SettlementService } from "@app/services/settlement/settlement.service";
import Swal from "sweetalert2";
import { first } from 'rxjs/operators';
import { CatalogService } from "@app/services/catalog/catalog.service";
@Component({
  selector: 'app-edit-collaborator', 
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.scss']
})
export class EditCollaboratorComponent implements OnInit {

  aFormGroup: FormGroup;
  id: number;
  public settlement: SettlementModel[] = [];
  loading: boolean;
  leader: collaboratorModel = new collaboratorModel();
  blockSpecial: RegExp = /[a-z,A-Z,\s]/ ;

  constructor(
    private apiCollaborator: CollaboratorService,
    private route: ActivatedRoute,
    private apiSettlemt: SettlementService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiCatalog: CatalogService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.aFormGroup = this.formBuilder.group({

      firstName: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      maternalSurname: ["", [Validators.required]],
      paternalSurname: ["", [Validators.required]],
      settlementsId: ["", [Validators.required]],

    }, FormGroup);

    this.apiCollaborator.getByIdCollaborator(this.id)
      .subscribe(data => {
        console.log("data",data);
        this.aFormGroup.patchValue(data);
        this.aFormGroup.get("firstName").setValue(data.firstName);
        this.aFormGroup.get("phoneNumber").setValue(data.phoneNumber);
        this.aFormGroup.get("maternalSurname").setValue(data.maternalSurname);
        this.aFormGroup.get("paternalSurname").setValue(data.paternalSurname);
        this.aFormGroup.get("settlementsId").setValue(data.settlementsId);
      console.log(this.aFormGroup)
      });

    this.aFormGroup.valueChanges.subscribe(data => 
      this.onCollaboratorFormChange(data));

    this.loading = true;
    this.apiCatalog.getSettlement().subscribe(res => {
      console.log(res);
      this.settlement = res.payload;
      this.loading = false;
    });

  }

  onCollaboratorFormChange(data) {
    console.log(data)
   this.leader = data;
  }

  updateCollaborator() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.aFormGroup.value;
        
        formData.settlementsId = this.settlementsId.value.map(value => value.id);
        console.log("posteo", formData);
        this.apiCollaborator.updateCollaborator(this.id, formData)
          .pipe(first())
          .subscribe(() => {
            Swal.fire({
              showConfirmButton: false,
              position: "center",
            icon: "success",
            title: "Colaborador actualizado",
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
        Swal.fire("Colaborador no actualizado", "", "info");
      }
    });

  }
  /**  UpdateUser() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.editDetailGroup.value;
        delete formData["confirmPassword"];
        formData.roleId = formData.roleId.id;
        this.api.UpdateUser(this.id, formData).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario actualizado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-users"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      } else if (result.isDenied) {
        Swal.fire("Usuario no actualizado", "", "info");
      }
    });
  } */

   enlaceChanged() {

  }

  

  get firstName() {
    return this.aFormGroup.get("firstName");
  }
  get settlementsId() {
    return this.aFormGroup.get("settlementsId");
  }
  set settlementsId(value) {
    this.aFormGroup.get('settlementsId').patchValue(value);
  }
  get phoneNumber() {
    return this.aFormGroup.get("phoneNumber");
  }
  get municipality() {
    return this.aFormGroup.get("municipality");
  }
  get maternalSurname() {
    return this.aFormGroup.get("maternalSurname");
  }
  get paternalSurname() {
    return this.aFormGroup.get("paternalSurname");
  }
}
