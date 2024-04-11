import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  model: any = {}
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots":true, "infinite": true, "autoplay": true};
  images=[
    {img: "assets/1.jpg"},
    {img: "assets/2.webp"},
    {img: "assets/3.jpg"},
  ]

  ngOnInit(): void {
  }

  constructor(public accountService: AccountService, private router:Router) { }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
