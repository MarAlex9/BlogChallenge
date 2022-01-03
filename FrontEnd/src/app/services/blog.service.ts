import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog';
import { catchError, throwError, Observable } from 'rxjs';
import { BlogRemote } from '../models/blogRemote';
import { Articles } from '../models/articles';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class BlogService  {
  myAppUrl = 'https://appblog.azurewebsites.net';
  myApiUrl = '/api/Blogs/';
  apiRemote = 'https://gnews.io/api/v4/search?q=watches&token=f3edcda2f2f50e68eb6df06d8729b6f7';
  list: Blog[] | undefined;
  listRemote: BlogRemote[] | undefined;
  article: Articles | undefined;
  constructor(private http: HttpClient, toastr: ToastrService ) { 
  }

  //conexión con la api remota+
  //Método para guardar el articulo
  guardar(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.myAppUrl + this.myApiUrl, blog);
  }

  obtenerBlog() {
    this.http.get(this.myAppUrl + this.myApiUrl).pipe(
      catchError(error => {
        let errorMsg = '';
        if (error instanceof ErrorEvent) {
          //Error en el frontend
          errorMsg = `Client-side error: ${error.error.message}`;
        } else {
          //Error en el backedn
          errorMsg = `Server-side error: ${error.error.message}`;
        }
        return throwError(errorMsg);
      })
    ).toPromise().
      then((data) => {
        this.list = data as Blog[];
      })
  }

  obtenerBlogRemote() {
    this.http.get(this.apiRemote).pipe(
      catchError(error => {
        let errorMsg = '';
        if (error instanceof ErrorEvent) {
          //Error en el frontend
          errorMsg = `Client-side error: ${error.error.message}`;
        } else {
          //Error en el backedn
          errorMsg = `Server-side error: ${error.error.message}`;
        }
        return throwError(errorMsg);
      })
    ).toPromise()
      .then((data) => {
        this.article = data as Articles;
        this.listRemote = this.article.articles;
      });
  }
}

