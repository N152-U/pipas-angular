import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '@app/services/trips/trips.service';
import { collaboratorModel } from '@app/models/collaborator/collaborator.module';
import { CollaboratorService } from '@app/services/collaborator/collaborator.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-edit-trips',
  templateUrl: './edit-trips.component.html',
  styleUrls: ['./edit-trips.component.scss']
})
export class EditTripsComponent implements OnInit {

 
  aFormGroup: FormGroup;
  id: number;
  loading: boolean;
  collaboratorCatalog: collaboratorModel []=[];
  settlements: [];
  public selectedCollaborator : any;
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
    this.apiCollaborator.getAllCollaborator().subscribe(res => {
      this.collaboratorCatalog = res.payload;
      console.log("Colaborador",this.collaboratorCatalog)
      this.loading = false;
    });
    this.apiTrips.getByIdTrip(this.id)
    .subscribe(data => {this.aFormGroup.patchValue(data);
      console.log("Edicion viaje datos",data);
      this.aFormGroup.get("collaboratorId").setValue(data.collaboratorId);
    this.collaboratorChanged();
      this.aFormGroup.get("settlementId").setValue(data.settlementId);
      this.selectedSettlement =data.settlementId;
      this.aFormGroup.get("street").setValue(data.street);
    });
    this.aFormGroup.valueChanges.subscribe(data => this.onTripsFormChange(data));

  }
  
  onTripsFormChange(data) {
  }

  collaboratorChanged(){
    this.selectedCollaborator= this.aFormGroup.get('collaboratorId').value; 
    this.selectedSettlement={};
    this.settlements=this.aFormGroup.get('collaboratorId').value.settlementsId;
  
  }

 /*  selectedCollaborators(collaboratorId)
  {
    console.log("collaboratorId",collaboratorId)
    const valueObj = this.collaborators.find(collaborator => {
    console.log("collaboratorIdaa",valueObj)
    return collaborator === collaboratorId;})
    this.aFormGroup.get("collaboratorId").setValue(valueObj);
  } */

  settlementChanged()
  {
    this.selectedSettlement=this.aFormGroup.get('settlementId').value;
  }

  updateTrip() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
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
        this.apiTrips.updateTrips(this.id, this.aFormGroup.value)
          .pipe(first())
          .subscribe(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Pre-registro actualizado correctamente",
              showConfirmButton: false,
            });
            this.router.navigate(["/home"]);
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
              message = "Error de Servidor"
            Swal.fire({
              icon: "error",
              title: message,
              showConfirmButton: false,
            }).then(function () { });
          }
          );
      } else if (result.isDenied) {
        Swal.fire("Pre-registro No actualizado", "", "info");
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
