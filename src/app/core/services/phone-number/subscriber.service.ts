import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PhoneNumberService {

  private baseUrlPhoneNumber = environment.baseUrl + "phone-registers";
  private http = inject(HttpClient);

  getPhoneNumbers() {
    return this.http.get<any>(this.baseUrlPhoneNumber).pipe(
      map(({ status, data, message }) => data),
    )
  }

}
