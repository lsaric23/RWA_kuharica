import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-create.component.html'
})
export class RecipeCreateComponent {
  title = '';
  instructions = '';

  constructor(private http: HttpClient, private router: Router) {}

  saveRecipe() {
    const recipe = {
      title: this.title,
      instructions: this.instructions
    };

    this.http.post('http://localhost:3000/recipes', recipe).subscribe({
      next: (res) => {
        console.log('Recept spremljen!', res);
        alert('Recept je uspješno spremljen!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Greška pri spremanju recepta:', err);
        alert('Dogodila se greška pri spremanju recepta.');
      }
    });
  }
}