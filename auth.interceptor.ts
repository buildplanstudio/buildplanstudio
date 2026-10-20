import { HttpInterceptorFn } from '@angular/common/http';

// Adds "Authorization: Bearer <token>" to every API request when logged in.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('bps_token');
  return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
};
