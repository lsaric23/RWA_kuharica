import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html'
})
export class CommentListComponent implements OnInit {
  @Input() recipeId!: string;
  comments: any[] = [];
  text = '';

  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }
  load() { this.api.getComments(this.recipeId).subscribe(c => this.comments = c); }
  add() {
    if (!this.text.trim()) return;
    this.api.addComment(this.recipeId, this.text).subscribe(() => {
      this.text = '';
      this.load();
    });
  }
}