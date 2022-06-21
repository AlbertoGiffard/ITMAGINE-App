import { ICliente } from "./ICliente";
import { IItemPedido } from "./IItemPedido";

declare type EstadoPedido = "pendiente" | "por preparar" | "entregado" | "confirmado" | "pagado";

export declare interface IPedido {
    id : number,
    cliente : ICliente,
    numeroMesa : number,
    productos : IItemPedido[],
    estado : EstadoPedido,
    total : number,
    tiempoProm: number
}