import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router'; // Importez le service Router

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  latestSession: any;
  profile: any;
  locationData: any;
  currentDate: Date = new Date(); // Définir currentDate ici
  isMenuOpen: boolean = false; // Ajouter une propriété pour suivre l'état du menu

  constructor(
    private authService: AuthGoogleService,
    private cdr: ChangeDetectorRef,
    private sessionService: SessionService,
    private router: Router // Injectez le service Router dans le constructeur
  ) {}

  ngOnInit(): void {
    this.authService.profile$.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
        this.cdr.detectChanges(); // Déclencher la détection des modifications après l'initialisation du profil
        this.fetchProfileData();
      }
    });
  }

  fetchProfileData(): void {
    if (this.profile && this.profile.email) {
      this.sessionService.getSessionData(this.profile.email).subscribe(
        (data: any) => {
          this.latestSession = data;
          this.locationData = data.locationData;
          this.cdr.detectChanges();
        },
        (error: any) => {
          console.error('Error fetching profile data:', error);
        }
      );
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  goToHistory(): void {
    this.router.navigate(['/historique']);
    this.isMenuOpen = false;
  }
}
