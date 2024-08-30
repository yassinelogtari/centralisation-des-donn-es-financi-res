import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../File';

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
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/getAll`);
  }
  changePassword(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, payload);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`);
  }
}
