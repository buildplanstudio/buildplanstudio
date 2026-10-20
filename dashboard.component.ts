import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService, Project } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';

// Services each customer type can request (mirrors backend/src/data/catalog.js)
const SERVICES: Record<string, [string, string][]> = {
  client: [['design', 'Design'], ['3d', '3D Visualisation'], ['approval-layout', 'Approval Layout Plan']],
  builder: [['design', 'Design'], ['3d', '3D Visualisation'], ['approval-layout', 'Approval Layout Plan'], ['brochure', 'Brochure'], ['3d-video', '3D Video']],
  architect: [['plan', 'Plan'], ['design', 'Design'], ['brochure', 'Brochure'], ['3d-video', '3D Video']],
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container page-pad">
      <h1>Welcome, {{ auth.user()?.name }}</h1>

      @if (auth.user()?.role !== 'admin') {
        <form class="form card" [formGroup]="form" (ngSubmit)="submit()">
          <h2>Share your ideas</h2>
          <label>Project title <input formControlName="title" /></label>
          <label>Your ideas <textarea rows="5" formControlName="ideas"></textarea></label>
          <fieldset>
            <legend>What should our team prepare?</legend>
            @for (s of options; track s[0]) {
              <label class="check">
                <input type="checkbox" [checked]="selected().includes(s[0])" (change)="toggle(s[0])" /> {{ s[1] }}
              </label>
            }
          </fieldset>
          @if (error()) { <p class="notice error">{{ error() }}</p> }
          <button class="btn btn-primary" [disabled]="form.invalid">Send to our team</button>
        </form>
      }

      <h2>{{ auth.user()?.role === 'admin' ? 'All project requests' : 'Your projects' }}</h2>
      @for (p of projects(); track p.id) {
        <article class="card project">
          <header><h3>{{ p.title }}</h3><span class="pill">{{ p.status }}</span></header>
          <p>{{ p.ideas }}</p>
          @if (auth.user()?.role === 'admin') {
            <select [value]="p.status" (change)="setStatus(p.id, $any($event.target).value)">
              @for (st of statuses; track st) { <option>{{ st }}</option> }
            </select>
          }
        </article>
      } @empty {
        <p class="muted">No projects yet.</p>
      }
    </div>
  `,
})
export class DashboardComponent {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  auth = inject(AuthService);

  statuses = ['submitted', 'in-review', 'in-design', 'revision', 'approved', 'delivered'];
  options = SERVICES[this.auth.user()?.role ?? 'client'] ?? [];
  projects = signal<Project[]>([]);
  selected = signal<string[]>([]);
  error = signal('');

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    ideas: ['', Validators.required],
  });

  constructor() { this.load(); }

  load() { this.api.projects().subscribe(r => this.projects.set(r.projects)); }

  toggle(id: string) {
    this.selected.update(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));
  }

  submit() {
    this.api.createProject({ ...this.form.getRawValue(), services: this.selected() }).subscribe({
      next: () => { this.form.reset(); this.selected.set([]); this.error.set(''); this.load(); },
      error: e => this.error.set(e.error?.error || 'Could not send'),
    });
  }

  setStatus(id: string, status: string) { this.api.updateStatus(id, status).subscribe(() => this.load()); }
}
