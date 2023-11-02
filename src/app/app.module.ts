import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ReqInterceptor } from './shared/interceptors/http.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
//    { provide: HTTP_INTERCEPTORS,  useClass: ReqInterceptor , multi: true },
    { provide: HTTP_INTERCEPTORS,  useClass: ErrorInterceptor , multi: true },
    { provide: HTTP_INTERCEPTORS,  useClass: JwtInterceptor , multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
