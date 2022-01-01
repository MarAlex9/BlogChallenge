import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog';
import { Observable } from 'rxjs';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { BlogRemote } from '../models/blogRemote';
import { Articles } from '../models/articles';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  myAppUrl = 'https://localhost:5001';
  myApiUrl = '/api/Blogs/';

  apiRemote = 'https://gnews.io/api/v4/search?q=watches&token=74a35902cf69568d7369cbf89b7ece9a';
  list: Blog[] | undefined;
  listRemote: BlogRemote[] | undefined;
  article: Articles | undefined;
  constructor(private http: HttpClient) { }
  guardar(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.myAppUrl + this.myApiUrl, blog);
  }

  obtenerBlog() {
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise().
      then(data => {
        this.list = data as Blog[];

      })
  }

  obtenerBlogRemote() {
    this.http.get(this.apiRemote).toPromise()
      .then(data => {
       
        this.article = data as Articles;
        this.listRemote = this.article.articles;
      });

  }
}
