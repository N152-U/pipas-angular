import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import {
  FormControl,
  NgForm,
  NgModel,
  Validators,
  FormBuilder,
} from "@angular/forms";

/* ----- MODELS ------- */
import { UserModel } from "../../../../../models/user/userModel.module";
import { getRoles } from "../../../../../models/role/getRoles.module";

/* --- SERVICES----*/
import { ManageUsersService } from "../../../../../services/managment/manage-users/manage-users.service";
import { ManageRolesService } from "../../../../../services/managment/manage-roles/manage-roles.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  newUser: UserModel = new UserModel();
  roles: getRoles[] = [];
  aFormGroup: any;
  pattern: "/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/";

  constructor(
    private api: ManageUsersService,
    private router: Router,
    private apiRole: ManageRolesService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.apiRole.getAllRoles().subscribe((res) => {
      this.roles = res;
    });
    
    this.aFormGroup = this.formBuilder.group({
      roleId: ["", Validators.required],
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern(this.pattern),
        ],
      ],
      middleName: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern(this.pattern),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern(this.pattern),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
      confirmation: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  save(form: NgForm) {
    Swal.fire({
      title: "¿Desea guardar el nuevo usuario?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.crearUser(this.newUser).subscribe((resp) => {
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
        });
      } else if (result.isDenied) {
        Swal.fire("Usuario no guardado", "", "info");
      }
    });
  }
  
  get password() {
    return this.aFormGroup.get("password");
  }
  get confirmation() {
    return this.aFormGroup.get("confirmation");
  }
  get roleId() {
    return this.aFormGroup.get("roleId");
  }
  get username() {
    return this.aFormGroup.get("username");
  }
  get firstName() {
    return this.aFormGroup.get("firstName");
  }
  get middleName() {
    return this.aFormGroup.get("middleName");
  }
  get lastName() {
    return this.aFormGroup.get("lastName");
  }


}
