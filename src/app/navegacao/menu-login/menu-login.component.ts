import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtil } from 'src/app/shared/utils/local-storage-util';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent implements OnInit {

  token: string;
  user: any = '';
  email: string = '';
  localStorageUtils = new LocalStorageUtil();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  userLogin(): boolean {  
    this.token = this.localStorageUtils.getTokenUser();
    this.user = this.localStorageUtils.getUser();

    if (this.user) this.email = this.user.email;

    return this.token != null;
  }

  logout() {
    this.localStorageUtils.clearDateLocalUser();
    this.router.navigate(['/home']);
  }

}
