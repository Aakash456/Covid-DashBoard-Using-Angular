import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GloblaDataSummary } from 'src/app/models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecoverd = 0;
  globalData : GloblaDataSummary[];
  pieChart : GoogleChartInterface = {
    chartType : 'PieChart'
  }
  columnChart : GoogleChartInterface = {
    chartType : 'ColumnChart'
  }
  lineChart : GoogleChartInterface = {
    chartType : 'LineChart'
  }
  constructor(private dataService : DataServiceService) { }

  initChart(caseType : string){

    let dataTable = [];
    
    dataTable.push(["Country", "Cases"])
    
    this.globalData.forEach(cs=>{
      let value :number ;
      if (caseType == 'c')
        if (cs.confirmed > 2000)
          value = cs.confirmed
          
      if (caseType == 'a')
        if (cs.active > 2000)
          value = cs.active
      if (caseType == 'd')
        if (cs.deaths > 1000)
          value = cs.deaths
          
      if (caseType == 'r')
        if (cs.recovered > 2000)
            value = cs.recovered
        
        dataTable.push([
          cs.country, value
        ])
    })
    console.log(dataTable);

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        height : 500
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {height : 500},
    };
    
    
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next:(result)=>{
        console.log(result);
        this.globalData = result;
        result.forEach(cs=>{
          if(!Number.isNaN(cs.confirmed)){
          this.totalActive+=cs.active
          this.totalConfirmed+=cs.confirmed
          this.totalDeaths+=cs.deaths
          this.totalRecoverd+=cs.recovered
          }
        })
        this.initChart('c');
      }
    })
  }
  updateChart(input : HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value)
  }

}
