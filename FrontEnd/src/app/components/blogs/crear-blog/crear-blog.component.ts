import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  arrayBlog: Blog[] = [];
  showMainContent: Boolean = true;
  public verImagen: string | undefined;
  constructor(private formBuilder: FormBuilder,
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      id: 0,
      titulo: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(3000), Validators.minLength(50)]],
    })
  }

  ngOnInit(): void {
  }
  //Mètodo para guardar un artículo en la BDD
  guardar() {
    try {
      const blog: Blog = {
        titulo: this.form.get('titulo').value,
        descripcion: this.form.get('descripcion').value,
        imagen: this.verImagen
      }
      this.blogService.guardar(blog).subscribe(data => {
        this.form.reset();
      })
      this.toastr.success('Exitosamente', 'El artículo se guardo');
      this.blogService.obtenerBlog();
      this.verImagen = '';
    }
    catch (error) {
      this.toastr.error(`${error}`, 'Error al guardar el artículo');
    }

  }

  //Método para guardar la información en un array
  pushArray() {
    const blog: Blog = {
      titulo: this.form.get('titulo').value,
      descripcion: this.form.get('descripcion').value,
      imagen: this.verImagen
    }
    this.arrayBlog.push(blog);
    this.form.reset();
    this.toastr.success('Exitosamente', 'El artículo se creo');
    this.ShowHideButton();
  }

  //eliminar un elemento del array
  eliminar(blog: Blog) {
    this.arrayBlog.remove(blog);

  }
  //Permite mostrar u ocultar un div
  ShowHideButton() {
    this.showMainContent = this.showMainContent ? false : true;
  }

  //Capturar la imágen que se sube
  capturarFile(event: any) {
    const imgCapturada = event.target.files[0];
    this.extraerBase64(imgCapturada).then((image: any) => {
      this.verImagen = image.base;
      console.log(this.verImagen)
    })

  }

  //Convierte la imagen en base 64 para guardar en la BDD
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  }
  )
}
