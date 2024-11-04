import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { login } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy {

  model: login;

  constructor(public as: AuthService, private _router: Router) {
    this.model = {
      username: '',
      password: ''
    }
  }

  loggedInSub: Subscription | undefined;
  ngOnInit(): void {
    let auth = localStorage.getItem('Auth');
    this.loggedInSub = this.as.loggedIn$.subscribe({
      next: (p) => {
        if(p){
          this._router.navigate(['/contacts']);
        }
      }
    })
    if (auth) {
      this.as.loggedIn$.next(true);
    }
  }

  ngOnDestroy() {
    this.loggedInSub!.unsubscribe();
    this.loggedInSub = undefined;
  }

}
