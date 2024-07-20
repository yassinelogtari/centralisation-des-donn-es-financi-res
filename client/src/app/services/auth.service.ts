import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/api/login';
  private baseUrl = 'http://localhost:8090/api/register';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, mdp }).pipe(
      tap((response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.userSubject.next(response);
      })
    );
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user, { responseType: 'text' });
  }

  getUser() {
    return this.userSubject.value;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
