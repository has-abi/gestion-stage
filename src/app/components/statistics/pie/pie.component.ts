import {Component, NgZone, OnInit} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {StatisticsService} from "../../../services/statistics.service";
import {ConfigurationService} from "../../../services/configuration.service";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  selectedFiliere = "";
  private chart: am4charts.PieChart;
  constructor(private zone: NgZone,private statisticsService:StatisticsService,private configurationService:ConfigurationService) { }

  ngOnInit(): void {
    this.configurationService.getAllFilieres();
    this.getData(1);
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
  getData(id:number){
    this.statisticsService.getOrganismeData(id).subscribe(datas=>{
      if(datas.length>0){
        this.zone.runOutsideAngular(() => {
          let chart = am4core.create("piediv", am4charts.PieChart);
          chart.data = datas;
		console.log(datas);
          var pieSeries = chart.series.push(new am4charts.PieSeries());
          pieSeries.dataFields.value = "nombreOrganisme";
          pieSeries.dataFields.category = "nom";
		this.chart = chart;

        })
      }
    })
  }

}
