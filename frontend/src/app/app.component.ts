import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  get token() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
  }
}