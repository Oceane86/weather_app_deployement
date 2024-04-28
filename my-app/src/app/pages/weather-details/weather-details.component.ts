import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [NavbarModule,CommonModule],
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent implements OnInit {
  weatherData: any; // Propriété pour stocker les données météorologiques

  constructor(
    private route: ActivatedRoute,
    private weatherService: SessionService // Injection du service WeatherService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const cityId = params['id']; // Supposons que vous ayez un paramètre d'URL pour l'identifiant de la ville
      this.fetchWeatherData(cityId); // Appelez la méthode pour récupérer les données météorologiques
    });
  }

  fetchWeatherData(cityId: string): void {
    this.weatherService.getSessionData(cityId).subscribe(
      (data: any) => {
        this.weatherData = data; // Stockez les données dans la propriété weatherData
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données météorologiques:', error);
      }
    );
  }
}
