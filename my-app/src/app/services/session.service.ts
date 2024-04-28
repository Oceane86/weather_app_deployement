// session.service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/sessions`;
  constructor(private http: HttpClient) {}

  createSession(sessionData: { email: string, lat: number, lng: number }) {
    return this.http.post(`${this.apiUrl}`, sessionData);
  }

  // Récupérer les données de la dernière session
  getSessionData(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/latest`,{params:{email}});
  }


  getUserSessions(email: string): Observable<any[]> {
    let params = new HttpParams().set('email', email);
    return this.http.get<any[]>(`${this.apiUrl}/user`, { params: params });
  }

}
