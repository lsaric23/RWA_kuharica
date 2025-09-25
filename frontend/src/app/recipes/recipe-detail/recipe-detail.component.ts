import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, CommentListComponent],
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent {
  @Input() recipeId!: number;

  recipe = {
    id: 1,
    title: 'Primjer recepta',
    description: 'Ovdje ide opis recepta'
  };
}