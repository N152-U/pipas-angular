import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import {
  FormControl,
  NgForm,
  NgModel,
  Validators,
  FormBuilder,
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

  constructor(private api: ManageRolesService, private router: Router,public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.api.getPermissions().subscribe((res) => {
      this.permissions = res;
    });
    console.log("estos son los permisos"+this.permissions);
    this.aFormGroup = this.formBuilder.group({
      nameRole: ["", [Validators.required, Validators.minLength(2)]],
    });
  }

  save(form: NgForm) {
    Swal.fire({
      title: "¿Desea guardar el nuevo rol?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.createRole(this.newRole).subscribe((resp) => {
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
        });
      } else if (result.isDenied) {
        Swal.fire("Rol no guardado", "", "info");
      }
    });
  }
  get nameRole() {
    return this.aFormGroup.get('nameRole');
  }
}
