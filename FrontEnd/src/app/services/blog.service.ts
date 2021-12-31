import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  myAppUrl = 'https://localhost:5001';
  myApiUrl = '/api/Blogs/';
  constructor(private http: HttpClient) { }
  guardar(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.myAppUrl + this.myApiUrl, blog);
  }
}
