import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CollectionListComponent } from './collections/collection-list/collection-list.component';
import { CollectionCreateComponent } from './collections/collection-create/collection-create.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes/new', component: RecipeCreateComponent, canActivate: [AuthGuard] },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'collections', component: CollectionListComponent, canActivate: [AuthGuard] },
  { path: 'collections/new', component: CollectionCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}