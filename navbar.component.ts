import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="nav">
      <div class="container nav-inner">
        <a routerLink="/" class="brand">Build Plan Studio</a>
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/services" routerLinkActive="active">Services</a>
          <a routerLink="/pricing" routerLinkActive="active">Pricing</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          @if (auth.isLoggedIn()) {
            <a routerLink="/dashboard">Dashboard</a>
            <button class="btn btn-ghost" (click)="auth.logout()">Log out</button>
          } @else {
            <a routerLink="/login" class="btn btn-ghost">Log in</a>
            <a routerLink="/signup" class="btn btn-primary">Sign up</a>
          }
        </nav>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  auth = inject(AuthService);
}
