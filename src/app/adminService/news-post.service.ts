import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsPostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(environment.apiUrl + 'post');
  }

  setPosts(post): Observable<any>{
    return this.http.post(environment.apiUrl + 'post' , post );
  }

  getCategories(): Observable<any>{
    return this.http.get(environment.apiUrl + 'categories');
  }

  postCategories(category): Observable<any>{
    return this.http.post(environment.apiUrl + 'categories', category);
  }

  getTags(): Observable<any>{
    return this.http.get(environment.apiUrl + 'tags');
  }

  postTags(tags): Observable<any>{
    return this.http.post(environment.apiUrl + 'tags', tags);
  }

}
