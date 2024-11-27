import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {  Router } from '@angular/router';
import { inject} from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  let authToken = '';
  let authReq = req

  if(sessionStorage.getItem('token') !== null){
  
    authToken = 'Bearer '+ sessionStorage.getItem('token'); 
    
    authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
      }
    });

  }

  return next(authReq).pipe(
    catchError((err: any) => {

      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {     
          if (err.error.code == "token_not_valid") {
            console.log("tokecn no valido");
            sessionStorage.clear();
            router.navigate(['/login'])
            
          }
          alert(JSON.stringify(err.error))
        } else {
          alert(JSON.stringify(err.error))
        }
      }else {
        alert(JSON.stringify(err.error))
      }


      return throwError(() => err); 
    })
    
  );
};
