import { Component, EventEmitter, Inject, Input, isDevMode, NgZone, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-graphics-litersofwater',
  templateUrl: './graphics-litersofwater.component.html',
  styleUrls: ['./graphics-litersofwater.component.scss']
})
export class GraphicsLitersofwaterComponent {

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

  buildPictorial(customCapacity: number = 0) {

    //if(isDevMode())console.log(data);
    //if(isDevMode())console.log(this.chart);
    

    am4core.useTheme(am4themes_animated);
    const maxFillPercentage = 80;
    let capacity = (100 * customCapacity) / maxFillPercentage;
    let value = customCapacity;
    let circleSize = 0.8;

    let component = am4core.create("chartdivlitersofwater", am4core.Container)

    if (component.logo) {
      component.logo.disabled = true;
    }
    component.width = am4core.percent(100);
    component.height = am4core.percent(100);

    let chartContainer = component.createChild(am4core.Container);
    chartContainer.x = am4core.percent(50)
    chartContainer.y = am4core.percent(50)

    let circle = chartContainer.createChild(am4core.Circle);
    circle.fill = am4core.color("#dadada");

    let circleMask = chartContainer.createChild(am4core.Circle);

    let waves = chartContainer.createChild(am4core.WavedRectangle);
    waves.fill = am4core.color("#34a4eb");
    waves.mask = circleMask;
    waves.horizontalCenter = "middle";
    waves.waveHeight = 10;
    waves.waveLength = 30;
    waves.y = 500;
    circleMask.y = -500;

    component.events.on("maxsizechanged", function () {
      console.log("update");
      let smallerSize = Math.min(component.pixelWidth, component.pixelHeight);
      let radius = smallerSize * circleSize / 2;

      circle.radius = radius;
      circleMask.radius = radius;
      waves.height = smallerSize;
      waves.width = Math.max(component.pixelWidth, component.pixelHeight);

      //capacityLabel.y = radius;

      let labelRadius = radius + 20

      capacityLabel.path = am4core.path.moveTo({ x: -labelRadius, y: 0 }) + am4core.path.arcToPoint({ x: labelRadius, y: 0 }, labelRadius, labelRadius);
      capacityLabel.locationOnPath = 0.5;

      setValue(value);
    })


    function setValue(value) {
      let y = - circle.radius - waves.waveHeight + (1 - value / capacity) * circle.pixelRadius * 2;
      waves.animate([{ property: "y", to: y }, { property: "waveHeight", to: 10, from: 15 }, { property: "x", from: -50, to: 0 }], 5000, am4core.ease.elasticOut);
      circleMask.animate([{ property: "y", to: -y }, { property: "x", from: 50, to: 0 }], 5000, am4core.ease.elasticOut);
    }


    let label = chartContainer.createChild(am4core.Label)
    let formattedValue = component.numberFormatter.format(value);
    formattedValue = formattedValue.toUpperCase();
    console.log("formato", component.numberFormatter.format(value))
    label.text = formattedValue + " Litros";
 
    label.fill = am4core.color("#fff");
    label.fontSize = 30;
    label.horizontalCenter = "middle";


    let capacityLabel = chartContainer.createChild(am4core.Label)

    let formattedCapacity = component.numberFormatter.format(capacity, "#.#a").toUpperCase();;

    //capacityLabel.text = "Capacity " + formattedCapacity + " Litres";
    capacityLabel.fill = am4core.color("#34a4eb");
    capacityLabel.fontSize = 20;
    capacityLabel.textAlign = "middle";
    capacityLabel.padding(0, 0, 0, 0);


  }


}