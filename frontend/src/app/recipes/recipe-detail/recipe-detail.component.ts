import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from 'src/app/comments/comment-list/comment-list.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, CommentListComponent],
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent {
  recipe = {
    id: 1,
    title: 'Pasta Carbonara',
    images: ['https://via.placeholder.com/150']
  };
}