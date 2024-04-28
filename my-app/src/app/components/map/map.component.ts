import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  private map: any;
  @Output() locationFound = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 6); // Niveau de zoom initial plus élevé

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Lancer la recherche de la localisation de l'utilisateur après l'initialisation de la carte
    this.locateUser();
  }

  private locateUser(): void {
    this.map.locate({ setView: true, maxZoom: 10 });

    this.map.on('locationfound', (e: any) => {
      console.log('Coordinates:', e.latlng);
      this.locationFound.emit(e.latlng);

      // Effectuer un zoom animé de loin à proche de la position actuelle de l'utilisateur
      this.map.flyTo(e.latlng, 18, { // Augmenter le niveau de zoom pour un zoom plus rapproché
        animate: true,
        duration: 5 // Durée de l'animation en secondes
      });

      // Appel à l'API de géocodage inversé pour obtenir le nom de la ville
      this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
        .subscribe(response => {
          const cityName = response.address.city;
          const popupContent = `Votre position actuelle : ${cityName}`;
          L.marker(e.latlng, {
            icon: L.icon({
              iconUrl: 'assets/img/epingle.png',
              iconSize: [41, 41],
              iconAnchor: [41, 41],
              popupAnchor: [1, -31]
            })
          }).addTo(this.map).bindPopup(popupContent).openPopup();
        });
    });

    this.map.on('locationerror', (e: any) => {
      alert("Accès à la localisation refusé.");
    });
  }
}
