import { IMensaje } from "./IMensaje";
import { IMesa } from "./IMesa";

export declare interface IChatMozoCliente {
    id : string,
    mensajes : IMensaje[],
    emailMozo? : string,
    mesa : IMesa,
}