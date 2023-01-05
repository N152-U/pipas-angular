import { Component, Inject, isDevMode, NgZone, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';
import { data } from 'jquery';
import { random } from '@amcharts/amcharts4/.internal/core/utils/String';


@Component({
  selector: 'app-graphics-bar',
  templateUrl: './graphics-bar.component.html',
  styleUrls: ['./graphics-bar.component.scss']
})
export class GraphicsBarComponent {
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

  ngOnInit(): void { }




  ngAfterViewInit() {

  }

  buildpiperpoServiceRef(customdata, nameseriesX, nameseriesY) {


    am4core.createDeferred(function (div) {


      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv2", am4charts.XYChart);

      if (chart.logo) {
        chart.logo.disabled = true;
      }

      // Add data
      let colors = [
        "#E4EBE9",
        "#CAD6D3",
        "#AFC2BD",
        "#95AEA8",
        "#7A9A92",
        "#5F857C",
        "#5F6261",
        "#959695",
        "#7A7C7B",
        "#454746",
        "#2A2D2C",
        "#457166",
      ];
      chart.data = customdata;
      chart.data.map((value, index) => {
        Math.random() * am4core.color.length + 1;
        value["color"] = colors[Math.floor(Math.random() * (colors.length - 0)) + 0];
        console.log("valor con colores", value);
        return value;
      });

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = nameseriesX;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.inside = true;
      categoryAxis.renderer.labels.template.fill = am4core.color("#FFF");
      categoryAxis.renderer.labels.template.fontSize = 10;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.grid.template.strokeDasharray = "5,4";
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;

      // Do not crop bullets
      chart.maskBullets = false;

      // Remove padding
      chart.paddingBottom = 0;

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = nameseriesY;
      series.dataFields.categoryX = nameseriesX;
      series.columns.template.propertyFields.fill = "color";
      series.columns.template.propertyFields.stroke = "color";
      series.columns.template.column.cornerRadiusTopLeft = 35;
      series.columns.template.column.cornerRadiusTopRight = 35;
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";

      // Add bullets
      let bullet = series.bullets.push(new am4charts.Bullet());
      let image = bullet.createChild(am4core.Image);
      image.horizontalCenter = "middle";
      image.verticalCenter = "bottom";
      image.dy = 10;
      image.y = am4core.percent(100);
      image.propertyFields.href = "bullet";
      image.tooltipText = series.columns.template.tooltipText;
      image.propertyFields.fill = "color";
      image.filters.push(new am4core.DropShadowFilter());



      return chart;

    }, 'chartdiv2')
      .then((chart) => {
        // <code>chart</code> variable holds an instance of the chart
        if (isDevMode()) console.log('Chart ready', chart);
        this._chart = chart;
      });

  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this._chart.dispose();
  }



}


