/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Router } from "@angular/router";
/* importamos modelos y el servicio  */
import { DeliveryDetailModel } from '@app/models/delivery-detail/delivery-detail.module';
import { DeliveryDetailService } from '@app/services/delivery-detail/delivery-detail.service';
import { MunicipalityModel } from '@app/models/municipality/municipality.module';
import { SettlementModel } from '@app/models/settlement/settlement.module';
import { MunicipalityService } from '@app/services/municipality/municipality.service';
import { SettlementService } from '@app/services/settlement/settlement.service';
import { DeliveryModel } from '@app/models/delivery/delivery.module';
@Component({
  selector: 'app-edit-delivey-detail',
  templateUrl: './edit-delivey-detail.component.html',
  styleUrls: ['./edit-delivey-detail.component.scss']
})
export class EditDeliveyDetailComponent implements OnInit {
  
  //Dropdowns
  public selectedMunicipality: any;
  public selectedSettlement: any;
  public selectedGender: any;

  public municipalities: MunicipalityModel[] = [];
  public settlements: SettlementModel[] = [];
  public genders = [
    { id: 1, name: "Masculino", value:1 },
    { id: 2, name: "Femenino", value:2  },
    { id: 3, name: "No especifica", value:3  }
  ];

  //Formulario
  deliveryDetail: FormGroup;

  loading = false;

  /* Extrar el id */
  public delivery: DeliveryModel;
  protected _deliveryId = this.route.snapshot.paramMap.get("id");



  constructor(private apiDeliveryDetail: DeliveryDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private ms: MunicipalityService,
    private ss: SettlementService,
    private formBuilder: FormBuilder,
    private el: ElementRef) { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get("id");


    this.deliveryDetail = this.formBuilder.group({
      id: [id, [Validators.required]],
      deliveryId: [id, [Validators.required]],
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
      settlementId: [, [Validators.required]],
      zipcode: ["", [
        Validators.required,
        /*      Validators.minLength(3),
             Validators.maxLength(99) */
      ]],
      street: ["", [Validators.required]],
      externalNumber: ["", [Validators.required]],

      
    });

   
    this.apiDeliveryDetail.GetIdDeliveryDetail(id).subscribe((res) => {
      console.log("ññññññññññññññññññ",res);
     
      this.selectedMunicipality = res.municipality;
      this.selectedSettlement = res.settlement;
      this.selectedGender = {id:res.gender, name: this.genders[res.gender].name};
      console.log("holaaaaaaaaaaaa",this.selectedGender);
      res.municipalityId=res.settlement.municipalityId;
      res.zipcode=res.settlement.zip_code;
     
      
      delete res["status"];
      delete res["createdAt"];
      delete res["updatedAt"];
      delete res["settlement"];
      this.deliveryDetail.setValue(res);
      console.log(this.selectedGender, this.genders[1])
      this.deliveryDetail.patchValue({
        gender:this.selectedGender,
        zipcode: this.selectedSettlement.zip_code,
        municipalityId: { id: this.selectedSettlement.municipalityId, municipality: this.selectedSettlement.d_mnpio },
        settlementId: { id: this.selectedSettlement.id_asenta_cpcons, d_asenta: this.selectedSettlement.d_asenta }
      });
    });


    this.ms.GetallMuncipality().subscribe(res => {
      console.log("alcaldias", res);
      this.municipalities = res.payload;
      this.loading = false;
     
    });

    this.deliveryDetail.valueChanges.subscribe(data => this.onDeliveryDetaiFormChange(data));
  }



  onDeliveryDetaiFormChange(data) {
    console.log(data);
    console.log(this.deliveryDetail)

  }
  UpdateDeliveryDetail() {
    console.log(this.deliveryDetail.value)
    if (this.deliveryDetail.valid) {
      console.log(this.deliveryDetail.value.settlementId)
      let formData = this.deliveryDetail.value;
      delete formData['municipalityId'];
      delete formData['zipcode'];
      formData.settlementId = formData.settlementId.id;
      formData.gender = formData.gender.id;
      this.apiDeliveryDetail.UpdateDeliveryDetail(formData).subscribe((resp) => {
        console.log(resp);
        Swal.fire({
          position: "center",
          icon: 'success',
          text: 'Se guardó correctamente',
          type: 'success'
        } as SweetAlertOptions);
        this.router.navigate(["/delivery-detail/table-delivery-deail"]);
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
            title: resErr.error.message,
            text: message,
            type: 'error'
          } as SweetAlertOptions);
        });
    } else {
      this.validateAllFormFields(this.deliveryDetail); //{7}
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
      const municipalityId = this.deliveryDetail.get('municipalityId').value.id;
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
      this.selectedSettlement = {};
      this.settlements = [];
      this.settlementId.disable();
      //patchValue lo utilizamos para actualizar un campo, si utilizamos setValue se requeriria actualizar todo el formulario
      this.zipcode.patchValue("");
    }
  }

  settlementChanged() {


    try {
      const settlement = this.deliveryDetail.get('settlementId').value;
      console.log(this.selectedMunicipality)


      /* console.log("nueva seleccion",this.selectedMunicipality )
      console.log("poniendo codigo postal",settlement, settlement.zip_code) */
      this.deliveryDetail.patchValue({
        zipcode: settlement.zip_code,
        municipalityId: { id: settlement.municipalityId, municipality: settlement.d_mnpio }
      });
      if (!this.selectedMunicipality || (settlement.id != "" && (settlement.municipalityId != this.selectedMunicipality.id))) {
        console.log(settlement)
        this.selectedSettlement = { id: settlement.municipalityId, municipality: settlement.d_mnpio, municipalityId: settlement.municipalityId };

        console.log("form group alcaldia", this.deliveryDetail.get('municipalityId').value, "seleccionado alcaldia", this.selectedMunicipality)
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
          this.selectedSettlement = {};
          this.selectedMunicipality = {};

        }


      }, (err) => {
        this.settlements = [];
        this.deliveryDetail.get('settlementId').disable();
      })
    } catch (e) {
      if (isDevMode()) console.trace(e)
    }

  }


  get deliveryId() {
    return this._deliveryId;
  }

  get firstName() {
    return this.deliveryDetail.get('firstName');
  }

  get paternalSurname() {
    return this.deliveryDetail.get('paternalSurname');
  }
  get maternalSurname() {
    return this.deliveryDetail.get('maternalSurname');
  }
  get gender() {
    return this.deliveryDetail.get('gender');
  }
  get email() {
    return this.deliveryDetail.get('email');
  }
  get phoneNumber() {
    return this.deliveryDetail.get('phoneNumber');
  }
  get litersOfWater() {
    return this.deliveryDetail.get('litersOfWater');
  }
  get numberOfFamiliesServed() {
    return this.deliveryDetail.get('numberOfFamiliesServed');
  }
  get numberOfPeopleServed() {
    return this.deliveryDetail.get('numberOfPeopleServed');
  }
  get municipalityId() {
    return this.deliveryDetail.get('municipalityId');
  }
  get settlementId() {
    return this.deliveryDetail.get('settlementId');
  }
  get zipcode() {
    return this.deliveryDetail.get('zipcode');
  }
  get street() {
    return this.deliveryDetail.get('street');
  }
  get block() {
    return this.deliveryDetail.get('block');
  }
  get lot() {
    return this.deliveryDetail.get('lot');
  }
  get externalNumber() {
    return this.deliveryDetail.get('externalNumber');
  }
  get internalNumber() {
    return this.deliveryDetail.get('internalNumber');
  }
  get corner() {
    return this.deliveryDetail.get('corner');
  }
  get btwFirstStreet() {
    return this.deliveryDetail.get('btwFirstStreet');
  }
  get btwSecondStreet() {
    return this.deliveryDetail.get('btwSecondStreet');
  }
  get reference() {
    return this.deliveryDetail.get('reference');
  }
  get observation() {
    return this.deliveryDetail.get('observation');
  }

  set gender(value) {
    this.deliveryDetail.get('gender').patchValue(value);
    this.selectedGender = value;
  }

  set municipalityId(value) {
    this.deliveryDetail.get('municipalityId').patchValue(value);
    this.selectedMunicipality = value;
  }
  set settlementId(value) {
    this.deliveryDetail.get('settlementId').patchValue(value);
    this.selectedSettlement = value;
  }

  set zipcode(value) {
    this.deliveryDetail.get('zipcode').patchValue(value);
  }
}
