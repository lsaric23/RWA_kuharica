import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-create.component.html'
})
export class RecipeCreateComponent {
  title = '';
  instructions = '';
  ingredients = '';

  create() {
    console.log('Novi recept:', this.title, this.instructions, this.ingredients);
  }
}