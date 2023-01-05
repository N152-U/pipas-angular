/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { ManageUsersService } from "../../../../../services/managment/manage-users/manage-users.service";

@Component({
  selector: "app-detail-user",
  templateUrl: "./detail-user.component.html",
  styleUrls: ["./detail-user.component.scss"],
})
export class DetailUserComponent implements OnInit {
  public user: any = {};

  id: string;
  hashUser = require("object-hash");

  constructor(
    private mus: ManageUsersService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hashUser = this.route.snapshot.params["hash"];

    //GetDetailUser
    this.mus.GetByIdUserDetail(this.hashUser).subscribe((res) => {
      this.user = res;
    });
  }
}
