import { Component, OnInit,NgZone } from '@angular/core';
import * as am4maps from "@amcharts/amcharts4/maps"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4geodata_franceLow from "@amcharts/amcharts4-geodata/data/countries"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  private chart:am4maps.MapChart;
  constructor( private zone: NgZone ) { }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      var chart = am4core.create("chartdiv", am4maps.MapChart);
      chart.geodata = am4geodata_franceLow;
      chart.projection = new am4maps.projections.Miller();
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
        chart.zoomToMapObject(ev.target);
      });
      var label = chart.chartContainer.createChild(am4core.Label);
      label.text = "franceLow";
      this.chart=chart;

    })
    }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


}
