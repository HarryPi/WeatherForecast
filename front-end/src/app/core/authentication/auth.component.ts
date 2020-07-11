import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private readonly sub: Subscription;

  constructor(
      private authService: SocialAuthService,
      private router: Router
  ) {
    this.sub = new Subscription();
  }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }

  ngOnDestroy(): void {
    // Clear subscritions
    this.sub.unsubscribe();
  }

  async signInWithGoogle(): Promise<void> {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  async signInWithFB(): Promise<void> {
    await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
  }

}
