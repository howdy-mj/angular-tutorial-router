import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged' + (this.authService.isLoggedIn ? 'in' : 'out')
  }

  login() {
    this.message = 'Trying to log in...'

    // 전역 쿼리 파라미터와 프래그먼트를 NavigationExtras 객체타입으로 전달합니다.
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        const redirectUrl = '/admin'
        this.router.navigate([redirectUrl], navigationExtras)
      }
    })
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  ngOnInit(): void {
  }

}
