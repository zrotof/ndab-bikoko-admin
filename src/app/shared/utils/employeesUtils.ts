import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesUtils {

  constructor(private http : HttpClient) { }

  positionsList = [
    
    {
      id: 0,
      label: "Directrice des Opérations",
      code: "DO",
      order: 0
    },
    {
      id: 1,
      label: "Responsable d'agence",
      code: "Resp d'agence",
      order: 1
    },
    {
      id: 2,
      label: "Agent comptoir",
      code: "Agent comptoir",
      order: 2
    },
    {
      id: 3,
      label: "Commerciale",
      code: "Commerciale",
      order: 3
    },
    {
      id: 4,
      label: "PDG",
      code: "PDG",
      order: 9999
    }

  ]

  getPositionsList() {
    return this.positionsList;
  }
}
