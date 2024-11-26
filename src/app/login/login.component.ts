
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service'
import { UserModels, UserModelLogin } from './user.models'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public formControllogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,

  ) {
    this.formControllogin = this.formBuilder.group({
      usernameCtrl: ['malla', [Validators.required]],
      passwordCtrl: ['softDerUser', [Validators.required, Validators.minLength(8)]],
    })
  }

  login(): void {
    console.log("ok");
    
    if (this.formControllogin.valid) {
      const user: UserModelLogin = {
        username: this.formControllogin.value.usernameCtrl,
        password: this.formControllogin.value.passwordCtrl
      }

      this.authService.login(user)
          .subscribe(
            data => {
              console.log(data);
              sessionStorage.setItem('token', data.access)
              sessionStorage.setItem('refresh', data.refresh)

              this.formControllogin.reset()
              this.router.navigate(['/productos'])

          }
          ,
          err=>{
            alert(err.error.detail);
          }
        )
    }
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('token') !== null) {

    }

  }

}
