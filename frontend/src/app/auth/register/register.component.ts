import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  register() {
    this.api.register(this.username, this.email, this.password).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}