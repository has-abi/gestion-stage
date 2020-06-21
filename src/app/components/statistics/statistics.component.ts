import {Component, NgZone, OnInit} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {StatisticsService} from "../../services/statistics.service";
import {ConfigurationService} from "../../services/configuration.service";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent  {
  selectedFiliere = "";
  private chart: am4charts.XYChart;
  constructor(private zone: NgZone,private statisticsService:StatisticsService,private configurationService:ConfigurationService) {}

  ngAfterViewInit() {
    this.configurationService.getAllFilieres();
    this.chartData(1);

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
  get filieres(){
    return this.configurationService.filieres;
  }

  get villeStatistics(){
    return this.statisticsService.villeStatistics;
  }


  chartData(id:number){

    this.statisticsService.getData(id).subscribe(datas=>{
      if(datas.length>0){
        this.zone.runOutsideAngular(() => {
          let chart = am4core.create("chartdiv", am4charts.XYChart);

          chart.paddingRight = 20;

          chart.data = datas;
          console.log(chart.data)

          let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "nom";
          categoryAxis.title.text = "Villes ["+this.selectedFiliere+"]";
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.minGridDistance = 2;
          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.title.text = "Nombre de stages";
          let series = chart.series.push(new am4charts.ColumnSeries());
          series.name = "Les stage de la filière par ville";
          series.columns.template.tooltipText = "Titre: {name}\nVille: {categoryX}\nValeur: {valueY}";
          series.heatRules.push({
            "target": series.columns.template,
            "property": "fill",
            "min": am4core.color("#ffdd00"),
            "max": am4core.color("#ffbb00"),
            "dataField": "valueY"
          });
          series.dataFields.valueY = "nombreVille";
          series.dataFields.categoryX = "nom";
          this.chart = chart;
        });
      }
    })
  }
}
