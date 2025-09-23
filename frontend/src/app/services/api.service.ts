import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Auth
  register(username: string, email: string, password: string) {
    return this.http.post(`${this.base}/auth/register`, { username, email, password });
  }
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.base}/auth/login`, { username, password });
  }

  // Recipes
  getRecipes() { return this.http.get<any[]>(`${this.base}/recipes`); }
  getRecipe(id: string) { return this.http.get<any>(`${this.base}/recipes/${id}`); }
  createRecipe(data: any) { return this.http.post(`${this.base}/recipes`, data); }

  // Upload
  uploadImages(fd: FormData) { return this.http.post<{ urls: string[] }>(`${this.base}/upload`, fd); }

  // Comments
  getComments(rid: string) { return this.http.get<any[]>(`${this.base}/recipes/${rid}/comments`); }
  addComment(rid: string, text: string) { return this.http.post(`${this.base}/recipes/${rid}/comments`, { text }); }

  // Collections
  getCollections() { return this.http.get<any[]>(`${this.base}/collections/user/my`); }
  createCollection(name: string) { return this.http.post(`${this.base}/collections`, { name }); }
  addRecipeToCollection(cid: string, rid: string) { return this.http.post(`${this.base}/collections/${cid}/add-recipe/${rid}`, {}); }
}