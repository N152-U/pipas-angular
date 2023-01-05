/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';
import {
  Validators,
  FormBuilder,
} from "@angular/forms";

/* SERVICE */
import { ManageRolesService } from "../../../../../services/managment/manage-roles/manage-roles.service";
import { first } from "rxjs/operators";
  
@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.scss']
})
export class DetailRoleComponent implements OnInit {
  formRoleDetailGroup: any;
  public role: any = {};
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


    
    this.api.GetIdRoleDetail(this.hash).subscribe(
      (res) => {
      this.role = res
    });

  }

}
