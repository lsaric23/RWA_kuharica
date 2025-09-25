import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-list.component.html'
})
export class CommentListComponent {
  @Input() recipeId!: number;

  comments = [
    { author: 'Ana', text: 'Odličan recept!' },
    { author: 'Marko', text: 'Moglo bi biti malo začinjenije.' }
  ];

  newAuthor: string = '';
  newText: string = '';

  ngOnInit() {
    console.log('Prikazujem komentare za recept ID:', this.recipeId);
  }

  addComment() {
    if (this.newAuthor.trim() && this.newText.trim()) {
      this.comments.push({
        author: this.newAuthor,
        text: this.newText
      });
      this.newAuthor = '';
      this.newText = '';
    }
  }
}