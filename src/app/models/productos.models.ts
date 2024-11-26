export interface Producto{
    pk:number,
    nombre: string,
    descripcion: string,
    precio: number,
    activo: boolean,
    stock: number,
    imagen: string
}

export interface ProductoGuardar extends Omit<Producto, 'pk'>{}