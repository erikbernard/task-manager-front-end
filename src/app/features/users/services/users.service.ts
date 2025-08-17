import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CreateUser, INITIAL_USER, UpdatePassword, UpdateUser, User} from "../model/user.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpClient = inject(HttpClient);

  private currentUserSubject = new BehaviorSubject<User>(INITIAL_USER);
  public currentUser$: Observable<User> = this.currentUserSubject.asObservable();

  private baseURL= `${environment.baseURL}`;
  private endpointCreate = "users";
  private endpointProfile = "profile";
  private endpointUserMe = "users/me";
  private endpointUserMePassword = "users/me/password";

  create(user: CreateUser): Observable<User>{
    return this.httpClient.post<User>(`${this.baseURL}${this.endpointCreate}`, user);
  }
  // TODO: implementar alteração de dados do usuario
  update(user: UpdateUser): Observable<User>{
    return this.httpClient.put<User>(`${this.baseURL}${this.endpointUserMe}`, user);
  }
  // TODO: implementar deleção de usuario
  delete(): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}${this.endpointUserMe}`);
  }
  // TODO: implementar alteração de password
  UpdatePassoword(passwords: UpdatePassword): Observable<void>{
    return this.httpClient.put<void>(`${this.baseURL}${this.endpointUserMePassword}`, passwords);
  }
  getProfile(): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}${this.endpointProfile}`);
  }

  setCurrentUser(response: User): void {
    this.currentUserSubject.next(response);
  }
}
