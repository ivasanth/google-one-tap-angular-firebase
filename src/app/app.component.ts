import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'one-tap';
  $user: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.$user = this.authService.user;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
