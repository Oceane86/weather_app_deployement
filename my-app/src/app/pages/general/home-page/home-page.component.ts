import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../../services/auth-google.service';
import { MapComponent } from '../../../components/map/map.component';
import { SessionService } from '../../../services/session.service';
import moment from 'moment-timezone'; // Assurez-vous d'avoir installé moment-timezone
import { NavbarModule } from '../../../components/navbar/navbar.module';
import { WeatherForecastModule } from '../../../components/weather-forecast/weather-forecast.module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    NavbarModule,
    WeatherForecastModule // Utilisez le module partagé ici
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  latestSession: any;
  wind: number = 0;
  windDeg: number = 0;
  windGust: number = 0;
  profile: any;
  locationData: any;
  currentDate: Date = new Date();
  currentCity: any;
  greetingMessage: string = (new Date().getHours() < 12) ? "Bonjour" : "Bonsoir";
  loading: boolean = true; // Ajout de la variable loading

  constructor(
    private authService: AuthGoogleService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.authService.profile$.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
        this.sendSessionData();
      }
      this.cdr.detectChanges();
    });
  }

  onLocationFound(latlng: any) {
    this.locationData = latlng;
    this.sendSessionData();
  }

  onCityNameFound(cityName: string) {
    this.currentCity = cityName;
    this.sendSessionData();
  }

  sendSessionData(): void {
    if (this.profile && this.locationData) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const sessionData = {
        email: this.profile.email,
        lat: this.locationData.lat,
        lng: this.locationData.lng,
        timezone: timezone
      };
      this.sessionService.createSession(sessionData).subscribe({
        next: (res: any) => {
          setTimeout(() => {
            this.fetchProfileData();
          }, 1000);
        },
        error: (err: any) => console.error('Error creating session', err)
      });
    }
  }

  fetchProfileData() {
    if (this.profile && this.profile.email) {
      this.sessionService.getSessionData(this.profile.email).subscribe(
        (data: any) => {
          this.latestSession = data;
          this.wind = data.wind;
          this.windDeg = data.wind.deg;
          this.windGust = data.wind.gust;
          this.loading = false; // Marquer le chargement comme terminé
          console.log('Dernière session:', this.latestSession);
          this.cdr.detectChanges();
        },
        (error: any) => {
          console.error('Erreur lors de la récupération de la dernière session:', error);
        }
      );
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getWeatherIcon(description: string): string {
    if (description.includes('nuageux')) {
      return 'assets/icon/cloudy.svg';
    } else if (description.includes('pluie')) {
      return 'assets/icon/drop.svg';
    } else if (description.includes('ensoleillé')) {
      return 'assets/icon/sun.svg';
    } else if (description.includes('couvert')) {
      return 'assets/icon/cloudy.svg';
    } else {
      return 'assets/icon/sun.svg';
    }
  }
}
