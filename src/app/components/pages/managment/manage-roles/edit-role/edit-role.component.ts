/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, isDevMode, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ChangeDetectorRef } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";



/*----MODEL---- */

import { PermissionModel } from "../../../../../models/role/permissionModel.module";
/* SERVICE */
import { ManageRolesService } from "../../../../../services/managment/manage-roles/manage-roles.service";
import { first } from "rxjs/operators";
  
@Component({
  selector: "app-edit-role",
  templateUrl: "./edit-role.component.html",
  styleUrls: ["./edit-role.component.scss"],
})
export class EditRoleComponent implements OnInit {
  formRoleDetailGroup: any;
  permissions: PermissionModel[] = [];
  loading = false;
  id: number;
  permissionsId: number[];
  checked: any = false;
  hash = require('object-hash');

  showLinkedRisksOnly = true;
  condition = true;


  constructor(
    private api: ManageRolesService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.hash = this.route.snapshot.params["hash"];

    this.formRoleDetailGroup = this._formBuilder.group({
      roleName: ["", [Validators.required, Validators.minLength(2)]],
      permissionId:  this._formBuilder.group([]),
    });


    
    this.api.GetIdRolePermission(this.hash).subscribe(
      (res) => {
      
      this.permissionsId = res;
      this.api.GetPermissions().subscribe((res) => {
        this.permissions = res;
        const newPermissions:number[]=this.permissions.map<number>((value)=>value.id);
        const checkboxes = <FormGroup>this.formRoleDetailGroup.get('permissionId');
       // console.log("checkboxes",checkboxes,"nuevo permisos",newPermissions)
     
        this.permissions.forEach((option: PermissionModel, index:number) => {
     
          if (isDevMode()) console.log( "permissions_role", this.permissionsId, "id_foreach", newPermissions[index], "permissions_includes",this.permissionsId.indexOf(newPermissions[index])>=0,"nara",String(option.id))
         
         checkboxes.addControl(String(option.id), new FormControl(this.permissionsId.indexOf(newPermissions[index])>=0)); 
      
      });
  
      if (isDevMode()) console.log("formdata", this.formRoleDetailGroup)
      });
      
    });

    this.api
      .GetIdRole(this.hash)
      .subscribe((x) => this.formRoleDetailGroup.patchValue(x[0]));

    this.formRoleDetailGroup.valueChanges.subscribe((data) =>
      this.onFormformRoleDetailGroupChange(data)
    );

  }

  onCheckboxChange(event):void {
    if (isDevMode()) console.log(this.formRoleDetailGroup.get("permissionId"))
  }


  onFormformRoleDetailGroupChange(data) {
    if (isDevMode()) console.log("Data", data);
  }

  UpdateRole() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api
          .UpdateRole(this.hash, this.formRoleDetailGroup.value)
          .pipe(first())
          .subscribe(() => {
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

  get roleName() {
    return this.formRoleDetailGroup.get("roleName");
  }
  get permissionId() {
    return this.formRoleDetailGroup.get("permissionId");
  }
}
