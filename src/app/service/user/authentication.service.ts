import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails, TokenResponse, TokenPayload } from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  private token: string;

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userUrl = environment.baseUrl + '/users';


  constructor(private http: HttpClient, private router: Router) {
    this.getToken();
    this.isLoggedIn();
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'authenticate' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.userUrl}/${type}`, user);
    } else {
      base = this.http.get(`${this.userUrl}/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'authenticate', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public getUserName(id): Observable<any> {
    return this.http.get<any>(`api/users/details/${id}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
