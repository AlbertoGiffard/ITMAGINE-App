import { IProducto } from "./IProducto";

export declare interface IItemPedido {
    nombre: string
    estado: string,
    idItem: string,
    idPedido: number,
    cantidad: number,
    tipo: string
}