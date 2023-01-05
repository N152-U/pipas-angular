import { TripsService } from '@app/services/trips/trips.service';
import { data } from 'jquery';
import { Component, isDevMode, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { first } from 'rxjs/operators';
import { tripsModel } from '@app/models/trips/trips.module';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trips-detail',
  templateUrl: './trips-detail.component.html',
  styleUrls: ['./trips-detail.component.scss']
})
export class TripsDetailComponent implements OnInit {

  public detailTrip: any;
  protected tripId = this.route.snapshot.paramMap.get("id");
  public imageurl;

  constructor(
    private sanitizer:DomSanitizer,
    private apiTrips: TripsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.apiTrips.detailGetById(this.tripId).subscribe((res) => {
        this.imageurl=this.sanitizer.bypassSecurityTrustResourceUrl(res["photos.data"]);
        this.detailTrip = res;
        console.log("Detalles",this.detailTrip);
   
       });
  }

}
