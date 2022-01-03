import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css'],
})
export class ListBlogsComponent implements OnInit {
  listBlog: Blog[] | undefined;
  constructor(public blogService: BlogService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    //Obtenemos las listas de las api remota y remota+
    try {
      this.blogService.obtenerBlog();
      this.blogService.obtenerBlogRemote();
    } catch (error) {
      this.toastr.error(`${error}`, "Error al conectar con el servidor");
    }

  }

  updateGet(){
    //Obtenemos las listas de las api remota y remota+
    try {
      this.blogService.obtenerBlog();
      this.blogService.obtenerBlogRemote();
      console.log(this.blogService.list);
    } catch (error) {
      this.toastr.error(`${error}`, "Error al conectar con el servidor");
    }

  }

}
