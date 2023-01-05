import { Component, Inject, isDevMode, NgZone, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";


@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent {

  private _chart: any;



  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {



  }

  dateTripsMunicipality(customdata, nameseriesX, nameseriesY, value) {

    am4core.createDeferred(function (div) {

      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      if (chart.logo) {
        chart.logo.disabled = true;
      }

      // Add data
      chart.data = customdata;

      // Create axes
      let xAxis = chart.xAxes.push(new am4charts.DateAxis());
      xAxis.renderer.grid.template.location = 0;
      //xAxis.renderer.minGridDistance = 30;

      let yAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.valueY = nameseriesY;
      series1.dataFields.dateX = nameseriesX;
      series1.dataFields.value = value;
      series1.strokeOpacity = 0;
      series1.cursorTooltipEnabled = false;

      let bullet1 = series1.bullets.push(new am4charts.CircleBullet());
      bullet1.tooltipText = "Viajes Totales:{valueY}";
      series1.heatRules.push({
        target: bullet1.circle,
        min: 10,
        max: 60,
        property: "radius"
      });


      // Add scrollbars
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarY = new am4core.Scrollbar();

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
     


      return chart;

    }, 'chartdiv2')
      .then((chart) => {

        if (isDevMode()) console.log('Chart ready', chart);
        this._chart = chart;
      });

  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this._chart) {
        this._chart.dispose();
      }
    });
  }
}



