import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { username, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest , {withCredentials: true})
      .pipe(
        tap(response => {
          localStorage.setItem('roles', response.roles);
          localStorage.setItem('username', response.username);
        })
      );
  }

  register(username: string, password: string, role: string): Observable<any> {
    const registerRequest: RegisterRequest = { username, password, role };
    return this.http.post(`${this.baseUrl}/api/users`, registerRequest , {withCredentials: true});
  }

  getRole(): string {
    const roles = localStorage.getItem('roles');
    return roles && roles.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
