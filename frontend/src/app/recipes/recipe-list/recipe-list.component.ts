import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() { this.api.getRecipes().subscribe(r => this.recipes = r); }
}