import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Kuharica</h1>
    <nav>
      <a routerLink="/">Recepti</a> |
      <a routerLink="/recipes/new">Dodaj recept</a>
    </nav>
    <hr />
    <router-outlet></router-outlet>
  `
})
export class App {}