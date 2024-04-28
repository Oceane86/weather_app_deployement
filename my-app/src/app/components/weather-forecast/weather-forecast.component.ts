import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  weatherForecast: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Vous devez remplir le tableau weatherForecast avec les données de prévision météorologique
    // par exemple, en appelant un service pour récupérer les données
  }

  getWeatherIcon(description: string): string {
    // Implémentez la logique pour retourner le chemin de l'icône météorologique en fonction de la description
    // Cette méthode doit retourner une chaîne représentant le chemin de l'icône météorologique
    // Par exemple :
    if (description.includes('nuageux')) {
      return 'assets/icon/cloudy.svg';
    } else if (description.includes('pluie')) {
      return 'assets/icon/rain.svg';
    } else if (description.includes('soleil')) {
      return 'assets/icon/sunny.svg';
    } else {
      return 'assets/icon/default.svg';
    }
  }
}
