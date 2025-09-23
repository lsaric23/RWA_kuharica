import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe: any;
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getRecipe(id).subscribe(r => this.recipe = r);
  }
}