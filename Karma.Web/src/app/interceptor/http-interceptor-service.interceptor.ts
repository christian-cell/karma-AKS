import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptorServiceInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
