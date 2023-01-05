import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";
import { CollaboratorService } from '@app/services/collaborator/collaborator.service';
import { collaboratorModel } from '@app/models/collaborator/collaborator.module';

@Component({
  selector: 'app-collaborator-table',
  templateUrl: './collaborator-table.component.html',
  styleUrls: ['./collaborator-table.component.scss']
})
export class CollaboratorTableComponent implements OnInit {

  first = 0;
  rows = 20;
  collaboratorDate: collaboratorModel[] = [];
  loadingTable = false;
 

  constructor(
    private apiCollaborator: CollaboratorService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.loadingTable = true;
    this.apiCollaborator.getAllCollaborator().subscribe(res => {
      console.log(res);
      this.collaboratorDate = res.payload;
      this.collaboratorDate.map((value)=>{
        console.log("iter1",value.settlementsId)
        value["settlements"]=value.settlementsId.reduce((accum, value)=>{
        
         return accum+=value.settlement+" ";
        },'') 
        
return value
      })
      console.log(this.collaboratorDate)
      this.loadingTable = false;

    });
  }

  deleteCollaborator(collaborator: collaboratorModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      type: 'question',
      text: `Qué desea borrar el Colaborador ${collaborator.firstName}`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    } as SweetAlertOptions).then(resp => {
      if (resp.value) {
        this.collaboratorDate.splice(i, 1);
        this.apiCollaborator.deleteCollaborator(collaborator.id).subscribe();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Colaborador eliminado correctamente",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else if (resp.isDenied) {
        Swal.fire("Colaborador no eliminado", "", "info");
      }
      
    });
  }

  editCollaborator(collaborato: collaboratorModel): void {
    localStorage.setItem("id", collaborato.id.toString());
    this.router.navigate(["edit"]);
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
    return this.collaboratorDate ? this.first === (this.collaboratorDate.length - this.rows) : true;
  }
  isFirstPage(): boolean {
    return this.collaboratorDate ? this.first === 0 : true;
  }



}
