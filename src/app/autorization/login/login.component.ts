import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Режим лоадера: Включен true, выключен false
  loaderActive = false

  // Объект для сообщения пользователя, type error, success
  message = {
    type: '',
    text: ''
  }

  // Реактивная Форма для входа
  loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private _fb: FormBuilder,
              private _api: ApiService,
              private _router: Router) { }

  get username() {return this.loginForm.get('useraname')}
  get password() {return this.loginForm.get('password')}

  // Попытка фхода пользователя
  onSubmit() {
    this.loaderActive = true
    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
    this._api.login(user).subscribe(
      res => {
        this.message.type = 'success'
        this.message.text = 'Welcome'
        localStorage.setItem('token', res.token)
        this._router.navigate(['']);
      },
      err => {
        console.log(err)
        this.message.type = 'error'
        this.message.text = 'Login or Password is invalid'
        this.loaderActive = false;
      }
    );
  }

  ngOnInit() {
    localStorage.removeItem('token');
  }

}
