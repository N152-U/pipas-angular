import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { LazyLoadEvent } from 'primeng/api';

import { ManageRolesService } from "../../../../services/managment/manage-roles/manage-roles.service";
import { roleModel } from "../../../../models/role/roleModel.module";

import { NgxPermissionsService, NgxRolesService } from "ngx-permissions";

declare var $: any;
@Component({
  selector: "app-manage-roles",
  templateUrl: "./manage-roles.component.html",
  styleUrls: ["./manage-roles.component.scss"],
})
export class ManageRolesComponent implements OnInit {
  roles: roleModel[] = [];
  loadingTable=true;
  cargando=false;
  first = 0;
  rows = 10;
  totalRecords:Number=0;
  hash = require('object-hash');


  constructor(private api: ManageRolesService, public router: Router,private ps: NgxPermissionsService,) {}


 

  ngOnInit(): void {
    
    this.cargar();
    this.loadRoles(null);
    this.cargando = false;
  }
  cargar() {
    this.cargando = true;

  }

  deleteRole(role: roleModel, i: number) {
    Swal.fire({
      title: `¿Está seguro que desea borrar el rol ${role.role}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.roles.splice(i, 1);
        this.api.DeleteRole(role.hash).subscribe((resp) => {
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
      }else if (result.isDenied) {
        Swal.fire("Rol no eliminado", "", "info");
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
  loadRoles(event: LazyLoadEvent)
  {
    
    if(event)
    {
      this.loadingTable = true;
      this.api.getTotalRegisters(event.first, event.rows,event.filters["role"]?.value).subscribe(res => {
        this.totalRecords=res.payload;
      });
      setTimeout(() => {
        this.api.GetAllRolesTable(event.first, event.rows,event.filters["role"]?.value).subscribe(res => {
          this.roles = res.payload;
          this.loadingTable = false;
        });
      }, 1000);
    }
  
  }
}
