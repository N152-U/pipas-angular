import { Component, Inject, isDevMode, NgZone, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-graphics-litres-municipality',
  templateUrl: './graphics-litres-municipality.component.html',
  styleUrls: ['./graphics-litres-municipality.component.scss']
})
export class GraphicsLitresMunicipalityComponent {
  private _chart: any;


  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {

  }

  buildMunicipalityTotalLiters(customdata, nameseriesX, nameseriesY) {

    am4core.createDeferred(function (div) {

      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartdivlitermunicipality", am4charts.XYChart);

      if (chart.logo) {
        chart.logo.disabled = true;
      }
      chart.scrollbarX = new am4core.Scrollbar();

      chart.data = customdata;

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = nameseriesX;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 50;

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = nameseriesY;
      series.dataFields.categoryX = nameseriesX;
      series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = "vertical";

      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      let hoverState = series.columns.template.column.states.create("hover");
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;
      
      chart.colors.list = [
        am4core.color("#E4EBE9"),
        am4core.color("#CAD6D3"),
        am4core.color("#AFC2BD"),
        am4core.color("#95AEA8"),
        am4core.color("#7A9A92"),
        am4core.color("#5F857C"),
        am4core.color("#5F6261"),
        am4core.color("#959695"),
        am4core.color("#7A7C7B"),
        am4core.color("#454746"),
        am4core.color("#2A2D2C"),
        am4core.color("#457166"),
        
      ];
      
      series.columns.template.adapter.add("fill", function (fill, target) {
       console.log("colores", target)
        return chart.colors.getIndex(target.dataItem.index);
      });


      // Cursor
      chart.cursor = new am4charts.XYCursor();



      return chart;

    }, 'chartdiv2')
      .then((chart) => {

        if (isDevMode()) console.log('Chart ready', chart);
        this._chart = chart;
      });

  }

  ngOnDestroy() {
    this._chart.dispose();
  }

}


