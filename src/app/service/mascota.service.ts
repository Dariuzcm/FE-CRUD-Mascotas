import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../interface/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private myAppURL: string = environment.endpoint
  private myApiURL: string = 'api/Mascota'
  constructor(private http: HttpClient) {
  }

  getMascotas(): Observable<Mascota[]> {
    const data = this.http.get<Mascota[]>(`${this.myAppURL}/${this.myApiURL}`);
    return data
  }

  getPet(id: number): Observable<Mascota> {
    const data = this.http.get<Mascota>(`${this.myAppURL}/${this.myApiURL}/${id}`)
    return data
  }
  
  createPet(pet: Mascota): Observable<any> {
    const response = this.http.post<any>(`${this.myAppURL}/${this.myApiURL}`, pet);
    return response
  }
  deletePet(petId:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppURL}/${this.myApiURL}/${petId}`);
  }
  updatePet(petId: number, pet: Mascota): Observable<void>{
    return this.http.put<void>(`${this.myAppURL}/${this.myApiURL}/${petId}`, pet);
  }
}
