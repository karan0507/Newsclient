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
    return this.http.get(environment.apiUrl + 'admin/post');
  }

  getPostCount(): Observable<any> {
    return this.http.get(environment.apiUrl + 'posts/count');
  }

  getPostById(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'post/' + id );
  }

  setPosts(post): Observable<any>{
    // return this.http.options(en)
    return this.http.post(environment.apiUrl + 'post' , post );
  }

  updatePost(id, post): Observable<any> {
    return this.http.put(environment.apiUrl + 'post/' + id , post);
  }

  deletePost(id) {
    return this.http.delete(environment.apiUrl + 'post/' + id);
  }

  getCategories(): Observable<any>{
    return this.http.get(environment.apiUrl + 'categories');
  }

  getCategoriesById(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'categories/' + id );
  }

  postCategories(category): Observable<any>{
    return this.http.post(environment.apiUrl + 'categories', category);
  }

  updateCategory(id, Category): Observable<any> {
    return this.http.put(environment.apiUrl + 'categories/' + id , Category);
  }

  deleteCategory(id) {
    return this.http.delete(environment.apiUrl + 'categories/' + id);
  }

  getTags(): Observable<any>{
    return this.http.get(environment.apiUrl + 'tags');
  }

  getTagsById(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'tags/' + id );
  }
  postTags(tags): Observable<any>{
    return this.http.post(environment.apiUrl + 'tags', tags);
  }

  updateTags(id, tags): Observable<any> {
    return this.http.put(environment.apiUrl + 'tags/' + id , tags);
  }

  deleteTags(id) {
    return this.http.delete(environment.apiUrl + 'tags/' + id);
  }

}
