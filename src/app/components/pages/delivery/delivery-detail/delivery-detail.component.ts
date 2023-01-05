import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SettlementService } from './../../../../services/settlement/settlement.service';
import { Component, OnInit, isDevMode, ElementRef } from '@angular/core';
/* impotar formularios y para las rutas */
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { DeliveryModel } from '@app/models/delivery/delivery.module';
import { DeliveryService } from '@app/services/delivery/delivery.service';
import { MunicipalityModel } from '@app/models/municipality/municipality.module';
import { MunicipalityService } from '@app/services/municipality/municipality.service';
import { DeliveryDetailModel } from '@app/models/delivery-detail/delivery-detail.module';
import { DeliveryDetailService } from '@app/services/delivery-detail/delivery-detail.service';
import { SettlementModel } from '@app/models/settlement/settlement.module';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.scss']
})
export class DeliveryDetailComponent implements OnInit {

  //Dropdowns
  public selectedMunicipality: any;
  public selectedSettlement: any;
  public selectedGender: any;

  public municipalities: MunicipalityModel[] = [];
  public settlements: SettlementModel[] = [];
  public genders = [
    { id: 1, name: "Masculino" },
    { id: 2, name: "Femenino" },
    { id: 3, name: "No especifica" }
  ];

  //Formulario
  formDeliveryDetail: FormGroup;

  loading = false;

  /* Extrar el id */
  public delivery: DeliveryModel;
  protected _deliveryId = this.route.snapshot.paramMap.get("id");

  constructor(private dds: DeliveryDetailService,
    private ms: MunicipalityService, private ds: DeliveryService,
    private route: ActivatedRoute, private router: Router,
    private ss: SettlementService,
    private formBuilder: FormBuilder,
    private el: ElementRef) { }

  ngOnInit(): void {




    /*  extrar el id para guardarlo */
    this._deliveryId = this.route.snapshot.paramMap.get("id");

    this.ds.GetIdDelivery(this.deliveryId).subscribe((res) => {
      console.log("getdelivery", res);
      this.delivery = res;

    });

    this.formDeliveryDetail = this.formBuilder.group({

      deliveryId: [this.deliveryId, [Validators.required]],
      firstName: ["", [Validators.required]],
      paternalSurname: ["", [Validators.required]],
      maternalSurname: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      gender: [, [Validators.required]],
      litersOfWater: ["", [Validators.required]],
      numberOfFamiliesServed: ["", [Validators.required]],
      numberOfPeopleServed: ["", [Validators.required]],
      municipalityId: [, [Validators.required]],
      settlementId: [{ value: "", disabled: true }, [Validators.required]],
      zipcode: ["", [
        Validators.required,
        /*      Validators.minLength(3),
             Validators.maxLength(99) */
      ]],
      street: ["", [Validators.required]],
      externalNumber: ["", [Validators.required]],
    });

    this.formDeliveryDetail.valueChanges.subscribe(data => this.onDeliveryDetaiFormChange(data));
    /* 
    this.formDeliveryDetail.asyncValidator(); */

    /* GetallMunicipality: funcion va dentro del void  */
    this.loading = true;
    this.ms.GetallMuncipality().subscribe(res => {
      console.log("alcaldias", res);
      this.municipalities = res.payload;
      this.loading = false;

    });

  }

  onDeliveryDetaiFormChange(data) {
    console.log(data);
    console.log(this.formDeliveryDetail)

  }

  /*   Funcion DeliveryDetailCrate */
  /*    DeliveryDetailCrate(form: NgForm) {
      Swal.fire({
        title: "¿Desea Registrar Nueva Viaje?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.dds.CreatDeliveryDetail(this.deliveryDetailM).subscribe((resp) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Viaje guarddo",
              showConfirmButton: false,
            });
            this.router.navigate(["/table-delivery-deail"]);
            setTimeout(() => {
              window.location.reload();
            }, 1300);
          });
        } else if (result.isDenied) {
          Swal.fire("Viaje no guardado", "", "info");
        }
      });
    } */
  DeliveryDetailCreate() {
    console.log(this.formDeliveryDetail.value)
    if (this.formDeliveryDetail.valid) {
      console.log(this.formDeliveryDetail.value.settlementId)
     
      let formData=this.formDeliveryDetail.value;
      console.log("antes", formData);
      delete formData['municipalityId'];
      delete formData['zipcode'];
      formData.settlementId=this.settlementId.value.id;
      formData.gender=this.gender.value.id;
      console.log("despues", formData);
      this.dds.CreateDeliveryDetail(formData).subscribe((resp) => {
        console.log(resp);
        Swal.fire({
          position: "center",
          icon: 'success',
          text: 'Se guardó correctamente',
          type: 'success'
        } as SweetAlertOptions);
        this.router.navigate(["/delivery-detail/table-delivery-detail"]);
      },
        (resErr) => {
           
          var message = ""
          if (resErr.error.validation) {
            resErr.error.validation.body.keys.forEach(element => {
              console.log(element)
              message += resErr.error.validation.body.message
            });
          } 
          console.log(message)
          Swal.fire({
            icon: 'error',
            title:resErr.error.message,
            text: message,
            type: 'error'
          } as SweetAlertOptions);
        });
    } else {
      this.validateAllFormFields(this.formDeliveryDetail); //{7}
      this.scrollToFirstInvalidControl();
    }



  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ng-invalid"
    );

    firstInvalidControl.focus(); //without smooth behavior
  }

  genderChanged() {



  }


  municipalityChanged() {

    try {
      const municipalityId = this.formDeliveryDetail.get('municipalityId').value.id;
      if (this.selectedMunicipality == null || this.selectedMunicipality.id != this.selectedSettlement.municipalityId) {
        console.log("Recalculando alcaldia", this.selectedMunicipality, this.selectedSettlement)
        this.ss.getSettlementsByMunicipalityId('municipalityId', municipalityId).subscribe((response) => {
          console.log(response)

          if (response.payload != null) {
            console.log(response.payload)
            this.settlements = response.payload;
            this.settlementId.enable();
            this.selectedSettlement = {};
            this.zipcode.patchValue("");
          }


        }, (err) => {
          this.settlements = [];
          this.settlementId.disable();
          this.zipcode.patchValue("");
        })
      }

    } catch (e) {
      if (isDevMode()) console.trace(e)
      this.selectedSettlement={};
      this.settlements = [];
      this.settlementId.disable();
      //patchValue lo utilizamos para actualizar un campo, si utilizamos setValue se requeriria actualizar todo el formulario
      this.zipcode.patchValue("");
    }
  }

  settlementChanged() {


    try {
      const settlement = this.formDeliveryDetail.get('settlementId').value;
      console.log(this.selectedMunicipality)


      /* console.log("nueva seleccion",this.selectedMunicipality )
      console.log("poniendo codigo postal",settlement, settlement.zip_code) */
      this.formDeliveryDetail.patchValue({
        zipcode: settlement.zip_code,
        municipalityId: { id: settlement.municipalityId, municipality: settlement.d_mnpio }
      });
      if (!this.selectedMunicipality || (settlement.id != "" && (settlement.municipalityId != this.selectedMunicipality.id))) {
        console.log(settlement)
        this.selectedSettlement={ id: settlement.municipalityId, municipality: settlement.d_mnpio, municipalityId: settlement.municipalityId };
      
        console.log("form group alcaldia", this.formDeliveryDetail.get('municipalityId').value, "seleccionado alcaldia", this.selectedMunicipality)
      }
    } catch (e) {
      if (isDevMode()) console.trace(e)
      this.zipcode.patchValue("");
    }

  }

  zipCodeChanged() {
    try {
      const zipCode = this.zipcode.value;

      this.ss.getSettlementsByMunicipalityId('zip_code', zipCode).subscribe((response) => {
        console.log(response)

        if (response.payload != null) {
          console.log(response.payload)
          this.settlements = response.payload;
          this.settlementId.enable();
          this.selectedSettlement={};
          this.selectedMunicipality={};
          
        }


      }, (err) => {
        this.settlements = [];
        this.formDeliveryDetail.get('settlementId').disable();
      })
    } catch (e) {
      if (isDevMode()) console.trace(e)
    }

  }

  get deliveryId(){
    return this._deliveryId;
  }

  get firstName(){
    return this.formDeliveryDetail.get('firstName');
  }

  get paternalSurname(){
    return this.formDeliveryDetail.get('paternalSurname');
  }
  get maternalSurname(){
    return this.formDeliveryDetail.get('maternalSurname');
  }
  get gender() {
    return this.formDeliveryDetail.get('gender');
  }
  get email(){
    return this.formDeliveryDetail.get('email');
  }
  get phoneNumber(){
    return this.formDeliveryDetail.get('phoneNumber');
  }
  get litersOfWater(){
    return this.formDeliveryDetail.get('litersOfWater');
  }
  get numberOfFamiliesServed(){
    return this.formDeliveryDetail.get('numberOfFamiliesServed');
  }
  get numberOfPeopleServed(){
    return this.formDeliveryDetail.get('numberOfPeopleServed');
  }
  get municipalityId(){
    return this.formDeliveryDetail.get('municipalityId');
  }
  get settlementId(){
    return this.formDeliveryDetail.get('settlementId');
  }
  get zipcode() {
    return this.formDeliveryDetail.get('zipcode');
  }
  get street() {
    return this.formDeliveryDetail.get('street');
  }
  get block() {
    return this.formDeliveryDetail.get('block');
  }
  get lot() {
    return this.formDeliveryDetail.get('lot');
  }
  get externalNumber() {
    return this.formDeliveryDetail.get('externalNumber');
  }
  get internalNumber() {
    return this.formDeliveryDetail.get('internalNumber');
  }
  get corner() {
    return this.formDeliveryDetail.get('corner');
  }
  get btwFirstStreet() {
    return this.formDeliveryDetail.get('btwFirstStreet');
  }
  get btwSecondStreet() {
    return this.formDeliveryDetail.get('btwSecondStreet');
  }
  get reference() {
    return this.formDeliveryDetail.get('reference');
  }
  get observation() {
    return this.formDeliveryDetail.get('observation');
  }

  set gender(value) {
    this.formDeliveryDetail.get('gender').patchValue(value);
    this.selectedGender = value;
  }

  set municipalityId(value) {
    this.formDeliveryDetail.get('municipalityId').patchValue(value);
    this.selectedMunicipality = value;
  }
  set settlementId(value) {
    this.formDeliveryDetail.get('settlementId').patchValue(value);
    this.selectedSettlement = value;
  }

  set zipcode(value) {
    this.formDeliveryDetail.get('zipcode').patchValue(value);
  }
}
