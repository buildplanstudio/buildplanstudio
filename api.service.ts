import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Service { id: string; name: string; description: string; }
export interface UserType { id: string; title: string; summary: string; services: Service[]; }
export interface Plan { id: string; name: string; price: number; unit: string; audience: string; features: string[]; highlight?: boolean; }
export interface Project {
  id: string; title: string; ideas: string; services: string[]; status: string;
  location: string; plotSize: string; budget: string; updates: { at: string; note: string }[];
}

// All backend calls live here. The URLs match backend/src/routes/*.js
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  services() { return this.http.get<{ userTypes: UserType[] }>('/api/services'); }
  pricing() { return this.http.get<{ plans: Plan[] }>('/api/pricing'); }
  contact(body: { name: string; email: string; message: string }) { return this.http.post('/api/contact', body); }
  projects() { return this.http.get<{ projects: Project[] }>('/api/projects'); }
  createProject(body: Partial<Project>) { return this.http.post<{ project: Project }>('/api/projects', body); }
  updateStatus(id: string, status: string) { return this.http.patch(`/api/projects/${id}/status`, { status }); }
}
