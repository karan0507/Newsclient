import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/adminService/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder,  private router: Router, private title: Title) {
    this.login = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Login | GarjaMaharashtra');
  }

  loginfunc() {
    this.auth.login(this.login.value).subscribe(login => {
      if (!login.error){
      this.router.navigateByUrl('dashboard');
      }
    },
    error => {
       console.log(error);
       if (error.statusText === 'Unauthorized')
       {
          alert('Wrong Pasword');
       }
    }

    );
  }

}
