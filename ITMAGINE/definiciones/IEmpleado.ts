declare type TipoEmpleado = "Metre" | "Cocinero" | "Bartender" | "Dueño";

export declare interface IEmpleado {
    nombre : string,
    apellido : string,
    DNI : string,
    CUIL : string,
    fotoURL : string,
    tipo : TipoEmpleado
}