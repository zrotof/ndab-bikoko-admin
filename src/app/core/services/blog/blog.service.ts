import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private http = inject(HttpClient)

  private readonly blogRubricBaseUrl = environment.baseUrl + "blog/rubrics";
  private readonly blogArticleBaseUrl = environment.baseUrl + "blog/articles";

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  addArticle(article : FormData): Observable<any> {
    return this.http.post<any>(this.blogArticleBaseUrl, article)
  }

  addRubric(rublicToSave: any): Observable<any>{
    return this.http.post<any>(this.blogRubricBaseUrl, rublicToSave, this.httpOptions)
  }

  editArticle(id: string , articleData: FormData): Observable<any>{
    return this.http.put<any>(this.blogArticleBaseUrl+`/${id}`, articleData);
  }

  editRubric(id: string , rubricData: any): Observable<any>{
    return this.http.put<any>(this.blogRubricBaseUrl+`/${id}`, rubricData, this.httpOptions);
  }

  deleteArticle(id: string): Observable<any>{
    return this.http.delete<any>(this.blogArticleBaseUrl+`/${id}`);
  }

  deleteRubric(id: number): Observable<any>{
    return this.http.delete<any>(this.blogRubricBaseUrl+`/${id}`)
  }
  
  getBlogArticleById(id : string): Observable<any>{
    return this.http.get<any>(this.blogArticleBaseUrl+`/${id}`, this.httpOptions)
  }

  getBlogRubricById(id : string): Observable<any>{
    return this.http.get<any>(this.blogRubricBaseUrl+`/${id}`, this.httpOptions)
  }

  getBlogArticleList(rubricId ?: string) : Observable<any>{

    let url = this.blogArticleBaseUrl

    if(rubricId){
      url = `${url}?rubricId=${rubricId}`
    }

    return this.http.get<any>(url).pipe(
      map(({status,data, message})=> data)
    )
  }

  getBlogRubrics(){
    return this.http.get<any>(this.blogRubricBaseUrl).pipe(
      map(({status,data, message})=> data)
    )
  }

}
