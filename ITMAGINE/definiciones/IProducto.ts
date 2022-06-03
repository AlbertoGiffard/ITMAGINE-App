declare type TipoProducto = "cocina" | "bar";

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