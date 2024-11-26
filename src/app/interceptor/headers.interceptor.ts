import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  const ContentType = 'application/json; charset=utf-8';

  const headers = new HttpHeaders({
    
    "Content-Type": ContentType,
    "Accept": ContentType,
  })

  const reqWithHeader = req.clone({
    headers: headers
  });
  

  return next(reqWithHeader);
};
