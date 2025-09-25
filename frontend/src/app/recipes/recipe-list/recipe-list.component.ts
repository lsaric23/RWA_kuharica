import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent {
  recipes = [
    { id: 1, title: 'Pasta Carbonara' },
    { id: 2, title: 'Pizza Margherita' },
  ];

  get token() {
    return localStorage.getItem('token');
  }
}