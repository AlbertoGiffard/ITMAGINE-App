declare type TipoQR = "mesa" | "propina" | "ingreso" | "DNI";

export declare interface IQR {
    qr : string,
    tipo : TipoQR
}