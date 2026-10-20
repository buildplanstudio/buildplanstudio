import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, UserType } from '../../core/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="container">
      <h1>Our services</h1>
      <p>You share the ideas. Our team prepares the plan.</p>

      @if (error()) { <p class="notice error">{{ error() }}</p> }

      <div class="cards-3">
        @for (t of types(); track t.id) {
          <article class="card">
            <h3>{{ t.title }}</h3>
            <p>{{ t.summary }}</p>
            <ul class="tick-list">
              @for (s of t.services; track s.id) {
                <li><strong>{{ s.name }}</strong> <span>{{ s.description }}</span></li>
              }
            </ul>
            <a class="btn btn-outline" routerLink="/login">Get started</a>
          </article>
        }
      </div>
    </section>
  `,
})
export class ServicesComponent {
  private api = inject(ApiService);
  types = signal<UserType[]>([]);
  error = signal('');

  constructor() {
    this.api.services().subscribe({
      next: r => this.types.set(r.userTypes),
      error: () => this.error.set('Could not load services. Is the backend running?'),
    });
  }
}
