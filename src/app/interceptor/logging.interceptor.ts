import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Request: ");
  console.log(req.body);
  console.log(req.url)
  console.log(req.method)


  return next(req).pipe(map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      console.log("Response");

      console.log(event.body);

      event = event.clone({ body: event.body });
    }
    return event;
  }));
};
