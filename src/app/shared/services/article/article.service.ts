import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  
  baseUrlRubric = environment.baseUrl+"rubrics/";
  baseUrlArticle = environment.baseUrl+"articles/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor( private http: HttpClient ) { }

  getRubricList() : Observable<any>{
    return this.http.get<any>(this.baseUrlRubric).pipe(
      map(({status,data, message})=> data)
    )
  }

  getArticleList(rubricId ?: number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrlArticle}?rubricId=${rubricId}`).pipe(
      map(({status,data, message})=> data)
    )
  }

  getRubricById(id : string): Observable<any>{
    return this.http.get<any>(this.baseUrlRubric+`${id}`, this.httpOptions)
  }

  getArticleById(id : string): Observable<any>{
    return this.http.get<any>(this.baseUrlArticle+`${id}`, this.httpOptions)
  }

  addRubric(rublic: any): Observable<any>{
    return this.http.post<any>(this.baseUrlRubric, rublic, this.httpOptions)
  }

  addArticle(article : FormData): Observable<any> {
    return this.http.post<any>(this.baseUrlArticle, article)
  }

  editRubric(id: string , rubricData: any): Observable<any>{
    return this.http.put<any>(this.baseUrlRubric+`${id}`, rubricData, this.httpOptions);
  }

  editArticle(id: string , articleData: FormData): Observable<any>{
    return this.http.put<any>(this.baseUrlArticle+`${id}`, articleData);
  }

  deleteRubric(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrlRubric+`${id}`)
  }

  deleteArticle(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrlArticle+`${id}`);
  }

}
