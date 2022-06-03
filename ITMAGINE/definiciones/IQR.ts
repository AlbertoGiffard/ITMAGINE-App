declare type TipoQR = "mesa" | "propina" | "ingreso";

export declare interface IQR {
    qr : string,
    tipo : TipoQR
}