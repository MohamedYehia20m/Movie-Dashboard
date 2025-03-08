import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {FormsModule} from '@angular/forms';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
      FormsModule
    ],
    standalone: true,
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    username: string = '';
    password: string = '';
    role: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          // Use the role from the response
          if (response && response.roles) {
            const role = response.roles.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER';
            this.router.navigate([role === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard']);
          }
        },
        error: (error) => console.error('Login failed:', error)
      });
    }

    register() {
      if (!this.role) {
        console.error('Role is required');
        return;
      }

      this.authService.register(this.username, this.password, this.role).subscribe({
        next: () => {
          // Only proceed with login if registration was successful
          this.login();
        },
        error: (error) => console.error('Registration failed:', error)
      });
    }
  }
