import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8090/api';
  private userKey = 'user';

  constructor(private http: HttpClient) { }


  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users/count`);
  }

  setUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : {};
  }

  clearUser() {
    localStorage.removeItem(this.userKey);
  }
  
}
