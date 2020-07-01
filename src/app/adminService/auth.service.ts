import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}


login(cred): Observable<any> {
  return this.http.post(environment.apiUrl + 'login', cred).pipe(map(
    user => {
      console.log(user);
      if (user){
        console.log(user);
        localStorage.setItem('token', JSON.stringify(user['access_token']));
        this.currentUserSubject.next(user);
      }
      return user;
    }
  ));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  this.router.navigateByUrl('login');
  this.currentUserSubject.next(null);
}
}
