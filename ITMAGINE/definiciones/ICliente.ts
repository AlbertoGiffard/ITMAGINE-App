import { IEmpleado } from "./IEmpleado";

/**
 * Estados que puede tomar la administración de la cuenta.
 *  en proceso: Cuenta recién creada y esperando aprobación.
 *  aceptada: **
 *  rechazada: **
 */
declare type EstadoCuentaCliente = "en proceso" | "aceptada" | "rechazada" ;

/**
 * Estados que puede tomar un cliente respecto a su presencia en el restaurante:
 *  sentado: En Mesa esperando a ser atendido.
 *  ordenando: En Mesa ya atendido.
 *  esperando: Esperando Orden.
 *  comiendo: **
 *  encuestado: Habiendo pagado y respondiendo encuesta. Si desea no responderla pasa a ausente.
 *  ausente: No se encuentra en el establecimiento.
 */
declare type EstadoAtencionCliente = "sentado" | "ordenando" | "esperando" | "comiendo" | "encuestado" | "ausente";

export declare interface ICliente {
    nombre : string,
    apellido : string,
    DNI : string,
    fotoURL : string,
    estadoCuenta : EstadoCuentaCliente,
    estadoAtencion: EstadoAtencionCliente,
    atendidoPor? : IEmpleado
}