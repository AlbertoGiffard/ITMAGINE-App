declare type TipoProducto = "Cocina" | "Bar";

export declare interface IProducto {
    nombre : string,
    descripcion : string,
    tiempoPromedioElaboracionEnMinutos : number,
    precio : number,
    fotoURLUno? : string,
    fotoURLDos? : string,
    fotoURLTres? : string,
    tipo : TipoProducto
}