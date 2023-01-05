import {Component} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-basic',
  templateUrl: './datepicker-basic.component.html',
  styleUrls: ['./datepicker-basic.component.scss']
})
export class NgbdDatepickerBasic {

  model: NgbDateStruct;
  date: {year: number};

  constructor(private calendar: NgbCalendar) {
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
