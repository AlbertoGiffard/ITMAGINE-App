declare type EstadoCliente = ""

export declare interface ICliente {
    nombre : string,
    apellido : string,
    DNI : string,
    fotoURL : string,
    estado : EstadoCliente
}