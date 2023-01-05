import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { roleModel } from "../../../../../models/role/roleModel.module";
import { PermissionModel } from "../../../../../models/role/permissionModel.module";
import { ManageRolesService } from "../../../../../services/managment/manage-roles/manage-roles.service";

@Component({
  selector: "app-new-role",
  templateUrl: "./new-role.component.html",
  styleUrls: ["./new-role.component.scss"],
})
export class NewRoleComponent implements OnInit {
  newRole: roleModel = new roleModel();
  aFormGroup: any;
  permissions: PermissionModel[] = [];

  constructor(
    private api: ManageRolesService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.api.GetPermissions().subscribe((res) => {
      this.permissions = res;
    }
    );

    this.aFormGroup = this.formBuilder.group({
      roleName: ["", [Validators.required, Validators.minLength(2)]],
      permissionId: this.formBuilder.array([],[Validators.required, Validators.minLength(1)])
    });
  }
  
  roleChanged() {}

  CheckboxArray(id, isChecked, key) {
    const permissionId = < FormArray > this.aFormGroup.get(key);
    if (isChecked) {
      permissionId.push(new FormControl(id));
    } else {
      const idx = permissionId.controls.findIndex(x => x.value == id);
      permissionId.removeAt(idx);
    }
  }

  save() {
    Swal.fire({
      title: "¿Desea guardar el nuevo rol?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.CreateRole(this.aFormGroup.value).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rol guardado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-roles"]);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },(resErr) => {
          console.log(resErr);
          let message;
          if (resErr.status === 400)
            message = resErr.error.validation['body'].message
          else if (resErr.status === 500)
            message = resErr.error.message;
          else
            message = "Error del servidor"
          Swal.fire({
            icon: "error",
            title: message,
            showConfirmButton: false,
          }).then(function () { });
        }
        );
      } else if (result.isDenied) {
        Swal.fire("Rol no guardado", "", "info");
      }
    });
  }
  get roleName() {
    return this.aFormGroup.get("roleName");
  }

   get permissionId() {
    return this.aFormGroup.get("permissionId");
  }

}
