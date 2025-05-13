import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly http = inject(HttpClient)

  private readonly baseAuthUrl = environment.baseUrl + "auth/";
  private readonly baseStaffUrl = environment.baseUrl + "staffs/";

  isStaffConnected = signal<boolean | undefined>(undefined);
  staffConnectedData = signal<any>(null);
  staffRoles = signal<any>([]);
  //staffGroupData = signal<Group[]>([]);

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  loginStaff(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseAuthUrl}login-staff`, credentials, { withCredentials: true }).pipe(
      switchMap(() => this.fetchStaff()),
      tap((res) => {
        this.staffConnectedData.set(res.staff);
        this.staffRoles.set(res.roles);
        this.isStaffConnected.set(true);

       
      })
    );
  }

  fetchStaff(): Observable<any> {
    return this.http.get<any>(`${this.baseStaffUrl}me`, { withCredentials: true }).pipe(
      map(({ status, data, message }) => data)
    )
  }

  logoutStaff(): Observable<any> {
    return this.http.post<any>(`${this.baseAuthUrl}logout-staff`, {}, { withCredentials: true }).pipe(
      map(({ status, data, message }) => data),
      tap((res) => {
        this.staffConnectedData.set(null);
        this.staffRoles.set(null);
        this.isStaffConnected.set(false);
      })
    )
  }

  hasRole(role: string): boolean {
    return this.staffRoles().map((r: any) => r.code).includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.staffRoles().map((r: any) => r.code).includes(role));
  }

}