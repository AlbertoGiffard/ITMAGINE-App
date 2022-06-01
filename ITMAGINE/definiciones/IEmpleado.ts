declare type TipoEmpleado = "metre" | "cocinero" | "bartender" | "dueño";

export declare interface IEmpleado {
    nombre : string,
    apellido : string,
    DNI : string,
    CUIL : string,
    fotoURL : string,
    tipo : TipoEmpleado
}