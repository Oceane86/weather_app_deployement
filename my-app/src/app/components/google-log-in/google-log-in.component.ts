import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';

@Component({
  selector: 'app-google-log-in',
  templateUrl: './google-log-in.component.html',
  styleUrls: ['./google-log-in.component.css']
})
export class GoogleLogInComponent {

  constructor(private authService: AuthGoogleService) {}

  signInWithGoogle() {
    this.authService.login();
  }

  // Fonction pour afficher la popup des conditions
  showConditionsPopup() {
    alert("Voici toutes les conditions d'utilisation : ..."); // Remplacez ... par vos conditions d'utilisation
  }

  // Méthode appelée lorsque la case à cocher est modifiée
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.showConditionsPopup();
    }
  }
}
