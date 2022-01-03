import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { ListBlogsComponent } from '../list-blogs/list-blogs.component';

@Component({
  providers: [ListBlogsComponent],
  selector: 'app-crear-blog',
  templateUrl: './crear-blog.component.html',
  styleUrls: ['./crear-blog.component.css']
})
export class CrearBlogComponent implements OnInit {

  //DECLAR VARIABLES
  form: FormGroup;
  editBlogFlag: Boolean = false;
  editBlog: Blog = new Blog;
  arrayBlog: Blog[] = [];
  showMainContent: Boolean = true;
  public verImagen: string | undefined;
  public contador = 0


  constructor(private formBuilder: FormBuilder,
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private listBlogComponent: ListBlogsComponent,
    private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      id: 0,
      titulo: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(3000), Validators.minLength(50)]],
    })
  }

  ngOnInit(): void {
    //Obtner los datos guardados en el navegador
    this.arrayBlog = JSON.parse(localStorage.getItem('array'));
    if (this.arrayBlog == null) {
      this.arrayBlog = [];
    }
  }


  //Mètodo para guardar un artículo en la BDD
  guardar(blog: Blog) {
    try {
      if (confirm('Una vez guardado el artículo no se puede hacer modificaciones')) {
        this.blogService.guardar(blog).subscribe(data => {

        })
        this.toastr.success('Exitosamente', 'El artículo se guardo');
        this.verImagen = '';
        this.deleteArticulo(blog);
        this.blogService.obtenerBlog();
        this.listBlogComponent.updateGet();
      }
    }
    catch (error) {
      this.toastr.error(`${error}`, 'Error al guardar el artículo');
    }

  }

  //Método para guardar la información en un array
  pushArray() {
    try {
      const blog: Blog = {
        titulo: this.form.get('titulo').value,
        descripcion: this.form.get('descripcion').value,
        imagen: this.verImagen
      }
      if (this.editBlogFlag) {
        this.editBlogFlag = false;
        //Obtiene el index del objento dentro del array
        const objIndex = this.arrayBlog.findIndex((obj => obj.titulo == this.editBlog.titulo &&
          obj.descripcion == this.editBlog.descripcion));
        this.arrayBlog[objIndex] = blog;
        this.toastr.success('Exitosamente', 'El artículo se actualizó');
      } else {
        this.arrayBlog.push(blog);
        this.toastr.success('Exitosamente', 'El artículo se creo');
      }
      this.form.reset();
      this.verImagen = '';
      this.ShowHideButton();
      localStorage.setItem('array', JSON.stringify(this.arrayBlog));
    } catch (error) {
      this.toastr.error(`${error}`, 'Error');
    }

  }

  //Eliminar un elemento del array
  eliminar(blog: Blog) {
    try {
      if (confirm("¿Esta seguro de eliminar el artículo?")) {

        this.deleteArticulo(blog);
        this.toastr.success('Exitosamente', 'El artículo se elimino');

      }
    } catch (error) {
      this.toastr.error(`${error}`, 'Error al guardar el artículo');
    }
  }
  deleteArticulo(blog: Blog) {
    this.arrayBlog.forEach((value, index) => {
      if (value.titulo == blog.titulo && value.descripcion == blog.descripcion) this.arrayBlog.splice(index, 1);
    })
    localStorage.setItem('array', JSON.stringify(this.arrayBlog));
  }

  //Método que permite actualizar el array
  actualizar(blog: Blog) {
    this.form.patchValue({
      titulo: blog.titulo,
      descripcion: blog.descripcion,
      imagen: blog.imagen
    });
    this.verImagen = blog.imagen;
    this.editBlog = blog;
    this.showMainContent = false;
    this.editBlogFlag = true;
    this.contador = blog.descripcion.length;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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
      const ext = this.verImagen?.substring(11, 14);
      if (!(ext == 'jpe'! || ext == 'png')) {
        this.toastr.warning('Debe ser .jpg o .png', 'Formato no permitido');
        this.verImagen = '';
      }
    })

  }

  //Contar los caracteres del texArea
  onKey(event: any) {
    this.contador = event.target.value.length
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
      this.toastr.error(`${e}`, 'Error al convertir la imagen');
      return null;
    }
  }
  )

}
