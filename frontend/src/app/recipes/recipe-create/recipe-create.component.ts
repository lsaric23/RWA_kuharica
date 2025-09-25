import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-create.component.html'
})
export class RecipeCreateComponent {
  title = '';
  instructions = '';

  constructor(private router: Router) {}

  saveRecipe() {
    console.log('Spremljeni recept:', {
      title: this.title,
      instructions: this.instructions
    });

    this.router.navigate(['/']);
  }
}