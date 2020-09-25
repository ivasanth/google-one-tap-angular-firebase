import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<any>(this.fireAuth.currentUser);
  constructor(
    private fireAuth: AngularFireAuth
  ) {
    this.init();
  }

  init(): void {
    window.onload = () => {
      window.google.accounts.id.initialize({
        client_id: environment.client_id,
        callback: (token) => {
          this.handle(token);
        }
      });
    };
    this.fireAuth.onAuthStateChanged((user) => {
      this.user.next(user);
      if (!user) {
        window.google.accounts.id.prompt();
      }
    });
  }

  handle(token): void {
    const credential = auth.GoogleAuthProvider.credential(token.credential);
    this.fireAuth.signInWithCredential(credential);
  }

  signOut(): void {
    this.fireAuth.signOut();
  }
}
