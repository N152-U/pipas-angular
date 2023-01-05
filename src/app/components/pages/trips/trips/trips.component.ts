import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '@app/services/trips/trips.service';
import { collaboratorModel } from '@app/models/collaborator/collaborator.module';
import { CollaboratorService } from '@app/services/collaborator/collaborator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  aFormGroup: FormGroup;
  id: number;
  loading: boolean;
  collaborators: collaboratorModel []=[];
  settlements: [];
  selectedCollaborator;
  selectedSettlement;
  

  constructor(
    private apiCollaborator: CollaboratorService,
    private apiTrips: TripsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.aFormGroup = this.formBuilder.group({
      collaboratorId: ["", [Validators.required]],
      municipalityId:["", [Validators.required]],
      settlementId: ["", [Validators.required]],
      street:["", [Validators.required]],
    }, FormGroup);

    this.loading = true;

    this.apiCollaborator.getAllCollaborator().subscribe(res => {
      
      this.collaborators = res.payload;
      this.loading = false;
    });

  }

  collaboratorChanged(){
    this.selectedCollaborator= this.aFormGroup.get('collaboratorId').value;
    this.selectedSettlement={};
    this.settlements=this.aFormGroup.get('collaboratorId').value.settlementsId;
  }
  settlementChanged()
  {
    this.selectedSettlement=this.aFormGroup.get('settlementId').value;
  }


  create() {
    Swal.fire({
      title: "¿Desea Registrar al Nuevo Viaje?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.aFormGroup.value;
        formData.collaboratorId = this.collaboratorId.value.id;
        formData.settlementId = this.settlementId.value.id;
        formData.municipalityId = this.settlementId.value.municipalityId;
        this.apiTrips.create(formData).subscribe(
          (resp) => {
            console.log(resp);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Pre-registro creado correctamente",
              showConfirmButton: false,
            });
            this.router.navigate(["home"]);
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
              message = "Error de servidor"
            Swal.fire({
              icon: "error",
              title: message,
              showConfirmButton: false,
            }).then(function () { });
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Pre-registro no guardado", "", "info");
      }
    });
  }

  get collaboratorId() {
    return this.aFormGroup.get("collaboratorId");
  }

  get settlementId() {
    return this.aFormGroup.get("settlementId");
  }

  get street() {
    return this.aFormGroup.get("street");
  }

}


