import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html'
})
export class RecipeCreateComponent {
  title = '';
  instructions = '';
  ingredients = '';
  files: File[] = [];

  constructor(private api: ApiService, private router: Router) {}

  onFileChange(e: any) { this.files = Array.from(e.target.files); }

  submit() {
    const ing = this.ingredients ? JSON.parse(this.ingredients) : [];
    const fd = new FormData();
    this.files.forEach(f => fd.append('images', f));

    if (this.files.length) {
      this.api.uploadImages(fd).subscribe(res => {
        this.api.createRecipe({ title: this.title, instructions: this.instructions, ingredients: ing, images: res.urls })
          .subscribe(() => this.router.navigate(['/']));
      });
    } else {
      this.api.createRecipe({ title: this.title, instructions: this.instructions, ingredients: ing })
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}