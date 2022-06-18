declare type TipoEmpleado = "metre" | "cocinero" | "bartender" | "mozo" | "dueño";

export declare interface IStaff {
    email : string,
    nombre : string,
    apellido : string,
    DNI : string,
    CUIL : string,
    fotoURL : string,
    tipo : TipoEmpleado,
    password: string
}