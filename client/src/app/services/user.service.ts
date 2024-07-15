import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8090/api';

  constructor(private http: HttpClient) { }


  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users/count`);
  }
}
