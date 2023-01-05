import { TripsService } from '@app/services/trips/trips.service';
import { data } from 'jquery';
import { Component, isDevMode, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { driverVehicleModel } from '@app/models/driver-vehicle/driver-vehicle.module';
import { DriverVehicleService } from '@app/services/driverVehicle/driver-vehicle.service';
import { CollaboratorService } from '@app/services/collaborator/collaborator.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { first } from 'rxjs/operators';
import { tripsModel } from '@app/models/trips/trips.module';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-associate-trip',
  templateUrl: './associate-trip.component.html',
  styleUrls: ['./associate-trip.component.scss']
})
export class AssociateTripComponent implements OnInit {
  @ViewChild('photo') photoRef: ElementRef;
  aFormGroup: FormGroup;
  id!: string;
  loading: boolean;
  public eco_list: tripsModel[] = [];
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  blockSpecial: RegExp = /[0-9]/;
  fullCapacity: boolean = false;

  constructor(
    private apiTrips: TripsService,
    private route: ActivatedRoute,
    private router: Router,
    private apicollaborator: CollaboratorService,
    private formBuilder: FormBuilder,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
//Validaciones https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/
    this.aFormGroup = this.formBuilder.group({
      folio: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
      folio2: [{value:'', disabled: true},],
      firstName: [{value:'', disabled: true}, []],
      phoneNumber: [{value:'', disabled: true}, []],
      settlement: [{value:'', disabled: true}, []],
      firstNamePipero: [{value:'', disabled: true}, []],
      phoneNumberPipero: [{value:'', disabled: true}, []],
      placa: [{value:'', disabled: true}, []],
      capacity: [{value:'', disabled: true}, []],
      street: [{value:'', disabled: true}, []],
      driverId: [null, [Validators.required]],
      eco: ["", []],
      photo: [null, ""],
      folioType: ['2'],
      folio2Type: [false]

    }, FormGroup);
    console.log("idViajes", this.id)
    this.apiTrips.getByIdEnlace(this.id)
      .subscribe(x => {
        console.log("dataEnlace", x);
        this.aFormGroup.patchValue(x);
        this.loading = false;
      });

    this.apiTrips.getAllEco().subscribe(res => {
      console.log("NoEco", res);
      this.eco_list = res.payload;
      this.loading = false;

    });

    this.onFolioTypeChange(null);



    this.aFormGroup.valueChanges.subscribe(data => this.onAssociateFormChange(data));
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        if(control.hasError)
        {
          
            console.log("invalido",control.errors)
          
        }
      
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  onAssociateFormChange(data) {
    console.log(data);
  }

  associateTrip() {

  }

  onFolioTypeChange(event) {
    console.log(event)
     //Folio 20000 (No puede llevar complemento)
    if (event==null||event.checked) {
    this.folioType.setValue(['2']);
      this.folio2.setValue(null);
      this.folio2.setValidators([]);
      this.folio2Type.setValue(null);
      this.folio2.disable();
      this.folio2Type.disable();
     
    } else {
       //Folio 10000 (Puede llevar complemento o ser unicamente de 10000)
      this.folioType.setValue(['1']);
      this.folio2.setValue(null);
        this.folio2.setValidators([]);
   
      this.folio2.disable();
      this.folio2Type.enable();
      
      
     
    }

  }

  onFolio2TypeChange(event) {
  //Lleva complemento
    if (event==null||event.checked) {
      this.folio2.setValue(null);
       this.folio2.setValidators([Validators.required]);
   this.folio2.enable();
   
    } else{
      //Sin complemento
      
        this.folio2.setValue(null);
         this.folio2.setValidators([]);
      this.folio2.disable();
     
    }

  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      var file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = async (e) => {/* await console.log(e.currentTarget?.result) */
        await this.imageCompress.compressFile(e.target.result.toString(), 1, 75, 50).then(
          result => {
            console.log(result);
            this.imgResultAfterCompress = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            this.aFormGroup.get("photo").patchValue({
              fileName: file.name,
              fileType: file.type,
              data: this.imgResultAfterCompress,
            });
            console.log(this.photo)
          }
        );
      };
    }
  }

  clearFile(event)
  {
    this.imgResultAfterCompress=null;
    this.photo.setValue(null);
    /*   const divEl: HTMLDivElement = this.myTestDiv.nativeElement; */
    this.photoRef.nativeElement.value=null;
  }
  

  assign() {
    Swal.fire({
      title: "¿Desea asignar la pipa al viaje?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(this.aFormGroup.valid)
      {
        if (result.isConfirmed) {
          const formData = this.aFormGroup.value;
          formData.driverId = this.driverId.value.id;
          formData.vehicleId = this.driverId.value.vehicleId;
          
          formData.photo = formData.photo ? formData.photo : null;
          //Asignacion de folios
          formData["folios"]=[];
           if(formData.folioType)
          {
            formData.folioType=formData.folioType[0]
            formData["folios"].push({folio:formData.folio,folioType:formData.folioType })
          }
          
          if(formData.folio2Type)
          {
            formData.folio2Type=formData.folio2Type[0]
            formData["folios"].push({folio:formData.folio2,folioType:formData.folio2Type })
          }
          
          delete formData["street"];
          delete formData["firstName"];
          delete formData["phoneNumber"];
          delete formData["settlement"];
          delete formData["firstNamePipero"];
          delete formData["phoneNumberPipero"];
          delete formData["capacity"];
          delete formData["eco"];
          delete formData["placa"];
          this.apiTrips.assign(this.id, this.aFormGroup.value)
            .pipe(first())
            .subscribe(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Pipa Asignada ",
                showConfirmButton: false,
                 timer: 1500
              });
              this.router.navigate(["/home"]);
              /* setTimeout(() => {
                window.location.reload();
              }, 1300); */
            },
              (resErr) => {
                console.log(resErr);
                let message;
                if (resErr.status === 400)
                  message = resErr.error.validation['body'].message
                else if (resErr.status === 500)
                  message = resErr.error.message;
                else
                  message = "Error del servidor"
                Swal.fire({
                  icon: "error",
                  title: message,
                  showConfirmButton: false,
                }).then(function () { });
              }
            );
        } else if (result.isDenied) {
         Swal.fire("", "Pipa no asignada", "info"); 
        }
      }else{
        this.validateAllFormFields(this.aFormGroup)
      }
     
    });
  }

  onEcoChanged() {
    try {
      const eco = this.aFormGroup.get('driverId').value;
      console.log("eco", eco);
      this.aFormGroup.patchValue({
        placa: eco.placa,
        capacity: eco.capacity,
        firstNamePipero: eco.firstNamePipero,
        phoneNumberPipero: eco.phoneNumberPipero,
      });
    } catch {
      if (isDevMode()) console.trace()
      this.placa.patchValue(null);
      this.capacity.patchValue(null);
      this.firstNamePipero.patchValue(null);
      this.phoneNumberPipero.patchValue(null);
    }
  }

  set placa(value) {
    this.aFormGroup.get('placa').patchValue(value);
  }

  set capacity(value) {
    this.aFormGroup.get('capacity').patchValue(value);
  }

  set firstNamePipero(value) {
    this.aFormGroup.get('firstNamePipero').patchValue(value);
  }

  set phoneNumberPipero(value) {
    this.aFormGroup.get('phoneNumberPipero').patchValue(value);
  }

  set folioType(value) {
    this.aFormGroup.get('folioType').patchValue(value);
  }

  set folio2Type(value) {
    this.aFormGroup.get('folio2Type').patchValue(value);
  }

  set folio(value) {
    this.aFormGroup.get('folio').patchValue(value);
  }

  set folio2(value) {
    this.aFormGroup.get('folio2').patchValue(value);
  }

  set eco(value) {
    this.aFormGroup.get('eco').patchValue(value);
  }


  get placa() {
    return this.aFormGroup.get('placa');
  }
  get capacity() {
    return this.aFormGroup.get('capacity');
  }

  get firstNamePipero() {
    return this.aFormGroup.get('firstNamePipero');
  }

  get phoneNumberPipero() {
    return this.aFormGroup.get('phoneNumberPipero');
  }

  get firstName() {
    return this.aFormGroup.get("firstName");
  }
  get phoneNumber() {
    return this.aFormGroup.get("phoneNumber");
  }
  get settlement() {
    return this.aFormGroup.get("settlement");
  }
  get driverId() {
    return this.aFormGroup.get("driverId");
  }

  get folioType() {
   return  this.aFormGroup.get('folioType');
  }

  get folio2Type() {
   return  this.aFormGroup.get('folio2Type');
  }
  get folio() {
   return  this.aFormGroup.get('folio');
  }

  get folio2() {
   return  this.aFormGroup.get('folio2');
  }

  get eco() {
    return this.aFormGroup.get('eco');
  }
  get photo() {
    return this.aFormGroup.get("photo");
  }
}
