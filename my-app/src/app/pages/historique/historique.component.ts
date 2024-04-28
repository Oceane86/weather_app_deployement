// historique.components.ts


import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';

import { Router } from '@angular/router';


@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [NavbarModule,CommonModule],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {

  sessions: any[] = [];
  userEmail: string | undefined;

  constructor(
    private sessionService: SessionService,
    private authService: AuthGoogleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.profile$.subscribe((profile) => {
      if (profile) {
        this.userEmail = profile.email;
        this.retrieveUserSessions();
      }
    });
  }

  retrieveUserSessions() {
    if (this.userEmail) {
      this.sessionService.getUserSessions(this.userEmail).subscribe(
        (data: any[]) => {
          this.sessions = data;
        },
        (error) => {
          console.error('Failed to retrieve user sessions:', error);
        }
      );
    } else {
      console.error('User email not available');
    }
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

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }

}



