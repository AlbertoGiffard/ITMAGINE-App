import { ICliente } from "./ICliente";
import { IMesa } from "./IMesa";
import { IPedido } from "./IPedido";
import { IStaff } from "./IStaff";

export declare interface IAppContext {
    usuario? : ICliente | IStaff | any,
    mesa? : IMesa,
    pedido? : IPedido,
    cambio? : boolean;
}