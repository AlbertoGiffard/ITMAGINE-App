export declare type TipoMesa = "vip" | "para discapacitados" | "estandar";

/**
 * Estados que puede tomar la mesa respecto a los comensales que puede haber en ella.
 * libre: **
 * ocupado: **
 * reservado: **
 */
export declare type EstadoAtencion = "libre" | "ocupado" | "reservado";

export declare interface IMesa {
    numero : number,
    nombreCliente : string,
    estadoAtencion: EstadoAtencion
    tipo : TipoMesa,
    cantidadComensales : number,
}