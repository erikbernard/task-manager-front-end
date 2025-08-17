import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {AuthService} from "../../../../core/auth.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css'
})
export class ProfilePage {
  user = inject(UsersService);
  auth = inject(AuthService);

  userData$ = this.user.currentUser$;
  userInitial$: Observable<string | undefined> = this.userData$.pipe(
    map(user => user?.name?.[0])
  );

  image = "https://placehold.co/150x150/ffebe8/ff725e?font=poppins&text=";

  onLogout(): void {
    this.auth.logout();
  }
}
