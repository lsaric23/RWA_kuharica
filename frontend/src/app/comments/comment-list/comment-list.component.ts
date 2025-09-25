import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html'
})
export class CommentListComponent {
  @Input() recipeId!: number; 
  comments = ['Odličan recept!', 'Isprobano i super.'];
}