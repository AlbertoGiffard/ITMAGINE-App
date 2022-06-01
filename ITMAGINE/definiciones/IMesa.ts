declare type TipoMesa = "VIP" | "Para Discapacitados" | "Estándar";

export declare interface IMesas {
    numero : number,
    cantidadComensales : number,
    tipo : TipoMesa
}