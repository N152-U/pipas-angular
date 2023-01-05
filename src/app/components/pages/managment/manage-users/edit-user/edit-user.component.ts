import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";

/*----MODEL----- */
import { UserModel } from "../../../../../models/user/userModel.module";
/*----SERVICE---- */
import { ManageUsersService } from "../../../../../services/managment/manage-users/manage-users.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  EditUser: UserModel[] = [];

  public id = this.route.snapshot.paramMap.get("id");

  constructor(
    private api: ManageUsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.api.getUser(id).subscribe((res) => {
      console.log(res);
      this.EditUser = res;
    });
  }

  updateUser(form: NgForm) {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.updateUser(this.EditUser[0][0]).subscribe((resp) => {
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
  }
}
