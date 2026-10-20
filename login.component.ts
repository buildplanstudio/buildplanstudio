import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container auth-wrap">
      <form class="form card" [formGroup]="form" (ngSubmit)="submit()">
        <h1>Log in</h1>
        <label>Email <input type="email" formControlName="email" /></label>
        <label>Password <input type="password" formControlName="password" /></label>
        @if (error()) { <p class="notice error">{{ error() }}</p> }
        <button class="btn btn-primary" [disabled]="form.invalid || busy()">
          {{ busy() ? 'Logging in…' : 'Log in' }}
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  busy = signal(false);
  error = signal('');

  submit() {
    this.busy.set(true);
    this.error.set('');
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: e => { this.error.set(e.error?.error || 'Login failed'); this.busy.set(false); },
    });
  }
}
