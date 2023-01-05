import { getByIdUser } from './../../../../models/user/getByIdUser.module';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router"; import { InputTextModule } from 'primeng/inputtext';
/* importamos modelos y el servicio  */
import { DeliveryModel } from '@app/models/delivery/delivery.module';
import { DeliveryService } from '@app/services/delivery/delivery.service';
import { PromoterModel } from '@app/models/promoter/promoter.module';
import { PromoterService } from '@app/services/promoter/promoter.service';
import { PiperoModel } from '@app/models/pipero/pipero.module';
import { PiperoService } from '@app/services/pipero/pipero.service';
import { TankerTruckModel } from '@app/models/tankertruck/tankertruck.module';
import { TankertruckService } from '@app/services/tankertruck/tankertruck.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  //Dropdowns
  public selectedPromoter;
  public selectedPipero;
  public selectedTankerTruck;

  public promoters: PromoterModel[] = [];
  public piperos: PiperoModel[] = [];
  public tankerTrucks: TankerTruckModel[] = [];
  public loading = false;



  //Formulario
  formDelivery: FormGroup;




  /* deliveryP$ : Observable;
   */
  constructor(private route: ActivatedRoute, private apitankertruck: TankertruckService,
    private apipipero: PiperoService, private apipromoter: PromoterService,
    private apidelivery: DeliveryService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/
    this.formDelivery = this.formBuilder.group({
      promoterId: ["", [Validators.required]],
      piperoId: ["", Validators.required],
      tankerTruckId: ["", Validators.required],
      capacity: ["", Validators.required],
      date: ["", Validators.required],
    });

    /*  Select pipiero, promotor y pipa */

    this.loading = true;
    this.apipromoter.GetallPromoter().subscribe(res => {
      console.log(res);
      this.promoters = res.payload;
      this.loading = false;
    });

    this.loading = true;
    this.apipipero.GetallPipero().subscribe(res => {
      console.log(res);
      this.piperos = res.payload;
      this.loading = false;
    });

    this.loading = true;
    this.apitankertruck.GetallTankerTruck().subscribe(res => {
      console.log(res);
      this.tankerTrucks = res.payload;
      this.loading = false;
    });
  }




  /*   Funcion DeliveryCreate */
  onSubmit() {
    

    if (this.formDelivery.valid) {

      let formData=this.formDelivery.value;
      console.log("antes",formData);
      formData.promoterId=this.promoterId.value.id;
      formData.piperoId=this.piperoId.value.id;
      formData.tankerTruckId=this.tankerTruckId.value.id;
      console.log("despues",formData);
      this.apidelivery.CreateDelivery(formData).subscribe((resp) => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          text: 'Se guardó correctamente',
          type: 'success'
        } as SweetAlertOptions);

        this.router.navigate(['/delivery-detail/delivery-detail-register', resp.payload.id]);
      },
        (resErr) => {
        console.log(resErr)
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
      this.validateAllFormFields(this.formDelivery); //{7}
    }


  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
        console.log(control)
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  promoterChanged() {

  }
  piperoChanged() {

  }

  get promoterId() {
    return this.formDelivery.get('promoterId');
  }
  get piperoId() {
    return this.formDelivery.get('piperoId');
  }
  get tankerTruckId() {
    return this.formDelivery.get('tankerTruckId');
  }
  get capacity() {
    return this.formDelivery.get('capacity');
  }
  get date() {
    return this.formDelivery.get('date');
  }
}
