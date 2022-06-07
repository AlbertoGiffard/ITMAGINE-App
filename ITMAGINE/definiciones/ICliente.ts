/**
 * Estados que puede tomar la administración de la cuenta.
 *  en proceso: Cuenta recién creada y esperando aprobación.
 *  aceptada: **
 *  rechazada: **
 */
declare type EstadoValidacionCuentaCliente = "en proceso" | "aceptado" | "rechazado" ;

declare type EstadoCliente = "inactivo" | "en espera" | "en mesa";

export declare interface ICliente {
    email : string,
    nombre : string,
    apellido : string,
    DNI : string,
    fotoURL : string,
    validacion : EstadoValidacionCuentaCliente,
    estado : EstadoCliente
}