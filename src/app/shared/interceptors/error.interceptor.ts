import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      
        return next.handle(req).pipe(
          catchError( (err : any) => {

            if(err.status === 500){
              return throwError(()=>"Erreur système, veuillez re-essayer plus tard. Si le probème persite veuillez contacter le webmaster")
            }

            return throwError(()=>err.error.message)
          })
        ); 
    }
  }