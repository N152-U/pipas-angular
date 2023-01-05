import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal, {SweetAlertOptions } from 'sweetalert2';

import { ManageRolesService} from "../../../../services/managment/manage-roles/manage-roles.service";
import { getRoles } from '../../../../models/role/getRoles.module';
@Component({
  selector: "app-manage-roles",
  templateUrl: "./manage-roles.component.html",
  styleUrls: ["./manage-roles.component.scss"],
})
export class ManageRolesComponent implements OnInit {
  roles: getRoles[] = [];
  cargando = false;
  first = 0;
  rows = 10;



  constructor(private api: ManageRolesService, public router: Router) {}

  ngOnInit(): void {
    this.cargando = true;

    this.api.getAllRoles().subscribe(res =>{
    console.log(res);
    this.roles = res;
    this.cargando = false;
    });
  }

  
  deleteRole( role: getRoles, i: number ) {

    Swal.fire({
      title: `¿Está seguro que desea borrar el rol ${role.role}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.roles.splice(i, 1);
        this.api.deleteRole(role.id).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rol eliminado",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      }
    });
  }
  
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.roles ? this.first === (this.roles.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.roles ? this.first === 0 : true;
  }
}
