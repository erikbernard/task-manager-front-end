import {inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {of, Observable, throwError, BehaviorSubject, catchError, fromEvent} from 'rxjs';
import { tap } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {LoggedIn, Login} from "../features/users/model/user.model";
import {UsersService} from "../features/users/services/users.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private userService = inject(UsersService);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private baseURL= `${environment.baseURL}`;
  private endpointLogin = "login";

  constructor() {
    if (this.hasToken()) {
      this.validateAndSyncSession();
    }
    fromEvent<StorageEvent>(window, 'storage')
      .subscribe((event) => {
      if (event.key === '@token') {
        if (!event.newValue) {
          // Token removido
          this.isAuthenticatedSubject.next(false);
          this.router.navigate(['/login']);
        } else {
          // Token adicionado
          this.validateAndSyncSession();
        }
      }
    });
  }

  public getIsAuthenticatedValue(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private saveToken(token: string): void {
    localStorage.setItem('@token', token);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('@token');
  }
  private clearToken(): void {
    localStorage.clear();
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private validateAndSyncSession(): void {
    this.userService.getProfile().pipe(
      catchError((error) => {
        console.error('Falha na validação do token, fazendo logout.');
        this.logout();
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.userService.setCurrentUser(response);
        this.isAuthenticatedSubject.next(true);
      }
    });
  }
  login(user: Login): Observable<LoggedIn>{
    return this.httpClient.post<LoggedIn>(`${this.baseURL}${this.endpointLogin}`, user)
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
          this.userService.setCurrentUser(response.user);
          this.router.navigate([ '/perfil']);
        }),
        catchError((error) => {
          this.clearToken();
          return throwError(() => new Error('Credenciais inválidas.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('@token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}
