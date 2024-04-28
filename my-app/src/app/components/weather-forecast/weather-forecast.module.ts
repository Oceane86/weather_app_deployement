import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [WeatherForecastComponent],
  exports: [WeatherForecastComponent],
  imports: [CommonModule]
})
export class WeatherForecastModule {
}

