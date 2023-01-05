import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";

/*----MODEL---- */
import { roleModel } from "../../../../../models/role/roleModel.module";
/* SERVICE */
import { ManageRolesService } from "../../../../../services/managment/manage-roles/manage-roles.service";
@Component({
  selector: "app-edit-role",
  templateUrl: "./edit-role.component.html",
  styleUrls: ["./edit-role.component.scss"],
})
export class EditRoleComponent implements OnInit {
  editRole: roleModel[] = [];
  public id = this.route.snapshot.paramMap.get("id");

  constructor(
    private api: ManageRolesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.api.getRole(id).subscribe((res) => {
      console.log(res);
      this.editRole = res;
    });
  }

  updateRole(form: NgForm) {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.updateRole(this.editRole[0][0]).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rol actualizado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-roles"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      } else if (result.isDenied) {
        Swal.fire("Rol no actualizado", "", "info");
      }
    });
  }
}
