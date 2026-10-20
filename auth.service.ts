import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export interface User { id: string; name: string; email: string; role: string; }
interface AuthResponse { token: string; user: User; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly user = signal<User | null>(JSON.parse(localStorage.getItem('bps_user') || 'null'));
  readonly isLoggedIn = computed(() => !!this.user());

  get token() { return localStorage.getItem('bps_token'); }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('/api/auth/login', { email, password }).pipe(tap(r => this.save(r)));
  }

  signup(form: { name: string; email: string; password: string; role: string; phone?: string; company?: string }) {
    return this.http.post<AuthResponse>('/api/auth/signup', form).pipe(tap(r => this.save(r)));
  }

  logout() {
    localStorage.removeItem('bps_token');
    localStorage.removeItem('bps_user');
    this.user.set(null);
    this.router.navigate(['/']);
  }

  private save(r: AuthResponse) {
    localStorage.setItem('bps_token', r.token);
    localStorage.setItem('bps_user', JSON.stringify(r.user));
    this.user.set(r.user);
  }
}
