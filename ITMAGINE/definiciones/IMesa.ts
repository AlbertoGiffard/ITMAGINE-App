declare type TipoMesa = "vip" | "para discapacitados" | "estándar";

export declare interface IMesas {
    numero : number,
    cantidadComensales : number,
    tipo : TipoMesa
}