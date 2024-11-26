import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Producto, ProductoGuardar } from '../../app/models/productos.models'

import { HttpService } from '../../app/services/http.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule,],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  title = 'carrito';

  productos: Producto[] = []
  public formControl: FormGroup;


  isModalOpen: boolean = false;
  idProducto: number = 0;

  constructor(
    private productoService: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.formControl = this.formBuilder.group({
      nombreCtrl: ['', [Validators.required]],
      descripcionCtrl: ['', [Validators.required]],
      precioCtrl: ['', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
      stockCtrl: ['', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
      imagenCtrl: ['', Validators.required],
    })
  }



  // Abre el modal
  openModal(): void {
    this.isModalOpen = true;
    this.idProducto = 0
    this.formControl.reset()
  }

  // Cierra el modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  consultaProductos(): void {
    this.productoService.getProductos()
      .subscribe(data => {
        console.log("Response: ");
        console.log(data);
        this.productos = data
      }, error => {
        console.log(error);

        if (error.status == 500) {
          alert("Error interno del servidor")
        } else if(error.status == 401) {
          alert("No estas autorizado")
        }else if(error.status == 404) {
          alert("No se encontro informacion")
        }

      })


  }

  editar(item: any): void {
    console.log(item);
    this.formControl.controls["nombreCtrl"].setValue(String(item.nombre));
    this.formControl.controls["descripcionCtrl"].setValue(String(item.descripcion));
    this.formControl.controls["precioCtrl"].setValue(String(item.precio));
    this.formControl.controls["stockCtrl"].setValue(String(item.stock));
    this.formControl.controls["imagenCtrl"].setValue(String(item.imagen));

    this.isModalOpen = true;

    this.idProducto = item.pk

  }


  guardar(): void {
    if (this.formControl.valid) {


      const producto: ProductoGuardar = {
        nombre: this.formControl.value.nombreCtrl,
        descripcion: this.formControl.value.descripcionCtrl,
        precio: this.formControl.value.precioCtrl,
        activo: true,
        stock: this.formControl.value.stockCtrl,
        imagen: this.formControl.value.imagenCtrl,
      }

      if (this.idProducto == 0) {
        this.productoService.create(producto)
          .subscribe(data => {
            console.log("Response: ");
            console.log(data);
            this.formControl.reset()
            this.consultaProductos();
            this.closeModal()

          }, error => {
            console.log(error);

            if (error.status == 500) {
              alert("Error interno del servidor")
            } else if(error.status == 401) {
              alert("No estas autorizado")
            }else if(error.status == 404) {
              alert("No se encontro informacion")
            }
          })
      } else {
        this.productoService.update(String(this.idProducto),producto)
          .subscribe(data => {
            console.log("Response: ");
            console.log(data);
            this.formControl.reset()
            this.consultaProductos();
            this.closeModal()

          }, error => {
            console.log(error);

            if (error.status == 500) {
              alert("Error interno del servidor")
            } else if(error.status == 401) {
              alert("No estas autorizado")
            }else if(error.status == 404) {
              alert("No se encontro informacion")
            }


          })
      }


    } else {

      this.formControl.markAllAsTouched()
    }


  }

  deleteProduct(id: number): void{

    let conf = confirm('Realmente quiere eliminar este producto?');

    if (conf == true) {
      this.productoService.deleteProducto(id)
      .subscribe(data =>{
        console.log("Response: ");
        console.log(data);
          this.consultaProductos();
      }, error => {
        console.log(error);

        if (error.status == 500) {
          alert("Error interno del servidor")
        } else if(error.status == 401) {
          alert("No estas autorizado")
        }else if(error.status == 404) {
          alert("No se encontro informacion")
        }

      })

      // alert("Action successfully executed");
    }

    
  }

  ngOnInit(): void {
    this.consultaProductos()
  }


}
