import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = '';

        if( req.url.includes("verify-email") === true && localStorage.getItem("tokenToVerifyEmail")) {
            token = localStorage.getItem("tokenToVerifyEmail") as string
        }
        else if (req.url.includes("reset-password") === true && localStorage.getItem("changePasswordToken")){
            token = localStorage.getItem("changePasswordToken") as string
        }
        else{
            token = localStorage.getItem("token") as string
        }

        const reqClone = req.clone({
            setHeaders: {
                "Authorization": "Bearer " + token
            }
        })

        return next.handle(reqClone);
    }
}