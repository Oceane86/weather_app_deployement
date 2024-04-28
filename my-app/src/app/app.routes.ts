import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/general/home-page/home-page.component';
import { GoogleLogInComponent } from './components/google-log-in/google-log-in.component';
import { HistoriqueComponent } from './pages/historique/historique.component';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: GoogleLogInComponent},
    {path: 'home', component: HomePageComponent},
    {path: 'historique', component: HistoriqueComponent},
    {path: 'details', component: WeatherDetailsComponent },

];


