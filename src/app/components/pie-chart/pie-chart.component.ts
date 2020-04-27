import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Create chart instance
    let chart = am4core.create("abida", am4charts.PieChart);

// Create pie series
    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.slices.template.propertyFields.fill="colors"
    series.labels.template.disabled=true;
// Add data
    chart.data = [{
      "country": "Lithuania",
      "litres": 501.9,
      "colors":"green"
    }, {
      "country": "Czech Republic",
      "litres": 301.9,
      "colors":"white"
    }, {
      "country": "Ireland",
      "litres": 201.1,
      "colors":"black"
    }, {
      "country": "Germany",
      "litres": 165.8,
      "colors":"red"
    }, {
      "country": "Australia",
      "litres": 139.9,
      "colors":"orange"
    }, {
      "country": "Austria",
      "litres": 128.3,
      "colors":"yellow"

    }];

// And, for a good measure, let's add a legend
    chart.legend = new am4charts.Legend();
  }

}
