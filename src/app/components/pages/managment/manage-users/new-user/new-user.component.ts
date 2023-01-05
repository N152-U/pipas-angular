
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
/* ----- MODELS ------- */
import { UserModel } from "../../../../../models/user/userModel.module";
import { roleModel } from "../../../../../models/role/roleModel.module";

/* --- SERVICES----*/
import { ManageUsersService } from "../../../../../services/managment/manage-users/manage-users.service";
import { ConfirmedValidator } from "@app/services/managment/manage-users/confirmed.validator";
import { ManageRolesService } from "../../../../../services/managment/manage-roles/manage-roles.service";

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
})
export class NewUserComponent implements OnInit {
  newUser: UserModel = new UserModel();
  public roles: roleModel[] = [];

  newDetailGroup: FormGroup;
  fieldTextType: boolean;
  fieldTextTypeConfirmation: boolean;
  pattern: "/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/";
  blockSpecial: RegExp = /[a-z,A-Z,\s]/ ;
  noSpecial: RegExp =  /[a-z,A-Z,\s]/;

  constructor(
    private mus: ManageUsersService,
    private router: Router,
    private mrs: ManageRolesService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newDetailGroup = this.formBuilder.group(
      {
        hash: ["", Validators.required],
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
          ],
        ],
        firstName: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
            Validators.pattern(this.pattern),
          ],
        ],
        middleName: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
            Validators.pattern(this.pattern),
          ],
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
            Validators.pattern(this.pattern),
          ],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
      },
      {
        validator: ConfirmedValidator("password", "confirmPassword"),
      }
    );

    this.mrs.GetAllRoles().subscribe((res) => {
      this.roles = res.payload;
    });
  }

  CreateUser() {
    Swal.fire({
      title: "¿Desea guardar el nuevo usuario?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.newDetailGroup.value;
        delete formData["confirmPassword"];
        formData.hash = formData.hash.hash;
        this.mus.CreateUser(formData).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario guardado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-users"]);
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
            message = "Error del servidor"
          Swal.fire({
            icon: "error",
            title: message,
            showConfirmButton: false,
          }).then(function () { });
        }
        );
      } else if (result.isDenied) {
        Swal.fire("Usuario no guardado", "", "info");
      }
    });
  }
  roleChanged() {null}
  get password() {
    return this.newDetailGroup.get("password");
  }

  get confirmPassword() {
    return this.newDetailGroup.get("confirmPassword");
  }
  get hash() {
    return this.newDetailGroup.get("hash");
  }
  get username() {
    return this.newDetailGroup.get("username");
  }
  get firstName() {
    return this.newDetailGroup.get("firstName");
  }
  get middleName() {
    return this.newDetailGroup.get("middleName");
  }
  get lastName() {
    return this.newDetailGroup.get("lastName");
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeConfirmation() {
    this.fieldTextTypeConfirmation = !this.fieldTextTypeConfirmation;
  }
}
