import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/api/login';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, mdp }).pipe(
      tap((response) => {
        this.userSubject.next(response);
      })
    );
  }

  getUser() {
    return this.userSubject.value;
  }
}
