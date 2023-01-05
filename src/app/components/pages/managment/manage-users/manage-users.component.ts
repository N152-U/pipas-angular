/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { ManageUsersService} from "../../../../services/managment/manage-users/manage-users.service";
import { Router } from '@angular/router';
import { getUsers } from '../../../../models/user/getUsers.module';
import Swal, {SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.scss"],
})
export class ManageUsersComponent implements OnInit {
  users: getUsers[] = [];
  cargando = false;
  first = 0;
  rows = 10;

  constructor(private api: ManageUsersService, public router: Router) {}

  ngOnInit(): void {
 
    this.cargando = true;

    this.api.getAllUsers().subscribe(res =>{
      console.log(res);
    this.users = res;
    this.cargando = false;
    });
  }

  borrarUser( user: getUsers, i: number ) {

      Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar a ${ user.username }?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    } as SweetAlertOptions).then( resp => {

      if ( resp.value ) {
      this.users.splice(i, 1);
        this.api.deleteUser( user.id ).subscribe();
        Swal.fire({
          title : 'Usuario eliminado',
          text:'Usuario eliminado correctamente',
          type: 'success'
        }as SweetAlertOptions)
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
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }
}
