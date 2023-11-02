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

            if(err.url.includes('verify-email')){
              
              const errorMessage =  { 
                status: 'error',
                data : null,
                message: "Nous ne parvenons pas à valider votre compte. Soit vous avez dépassé le délais maximal (48 heures) pour validater votre compte soit c'est une erreur interne. Dans tous les cas veuillez cliquez sur le bouton ci-dessous pour recevoir un autre mail de validation. Si le problème persiste, veuillez contacter le webmaster"
              }
              return throwError(()=>errorMessage)
            }
            return throwError(()=>err.error.message)
          })
        ); 
    }
  }