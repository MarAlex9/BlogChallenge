import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css'],
 
})
export class ListBlogsComponent implements OnInit {

  constructor(public blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.obtenerBlog();
    this.blogService.obtenerBlogRemote();
  }

}
