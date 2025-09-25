import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, AppRoutingModule],
  template: `<router-outlet></router-outlet>` 
})
export class App {}
