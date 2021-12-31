import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-crear-blog',
  templateUrl: './crear-blog.component.html',
  styleUrls: ['./crear-blog.component.css']
})
export class CrearBlogComponent implements OnInit {

  form: FormGroup;


  constructor(private formBuilder: FormBuilder, 
    private blogService: BlogService,
    private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      id: 0,
      titulo: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(3000), Validators.minLength(50)]],
    })
  }

  ngOnInit(): void {
  }
  guardar() {
    console.log(this.form);
    const blog: Blog = {

      titulo: this.form.get('titulo').value,
      descripcion: this.form.get('descripcion').value,

    }
    this.blogService.guardar(blog).subscribe(data => {
      this.toastr.success('exitosamente', 'El blog se guardo');
      this.form.reset();
    })
  }

}
