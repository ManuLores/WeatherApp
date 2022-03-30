import { Component, OnInit } from '@angular/core';

import { WeatherAppService } from './services/weather-app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private waService: WeatherAppService) {

  }

  ngOnInit() {
    this.waService.getWeather('Zaragoza', 'es').subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  
  }
}
