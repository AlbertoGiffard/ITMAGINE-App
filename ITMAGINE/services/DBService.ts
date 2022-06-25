import firebase from "../utils/firebase"
const firestore = firebase.firestore();

/**
 * Servicio que utiliza la base de datos Firestore
 * @param {<T>} class|interface a manejar. Sirve para dictarle al servicio a qué tipo tiene que hacer las conversiones.
 */
export class DBService<T> {

    /**
     * Construye el servicio definiendo de qué colección se obtendrán los datos.
     * @param {string} coleccion Nombre de la colección de donde se obtendrán los datos.
     */
    constructor(
        private coleccion : string
    ) {}

    /**
     * Obtiene un objeto por ID
     * @param {string} id Identificador del documento.
     * @returns {Promise<T>} Promesa con el objeto requerido y convertido.
     */
    public async getById ( id : string ) : Promise<T> {
        return (await (await firestore.collection( this.coleccion ).doc( id ).get()).data()) as T
    }

    /**
     * Obtiene todos los objetos de una colección.
     * @returns {Promsise<T>} Promesa con los objetos requeridos y convertidos.
     */
    public async getAll () : Promise<T[]> {
        return (await firestore.collection( this.coleccion ).get()).docs.map( doc => doc.data() ).map( obj => obj as T );
    }

    public async getAllPreparados (idPedido : any) : Promise<T[]> {
        return (await firestore.collection( this.coleccion ).where("idPedido", "==",  idPedido).get()).docs.map( doc => doc.data() ).map( obj => obj as T );
    }
    /**
     * Inserta un objeto en un documento con el Identificador especificado.
     * @param {T} obj objeto a insertar.
     * @param {string} id Identificador del documento a insertar.  
     * @returns 
     */
    public async insertOne ( obj : T, id : string ) : Promise<void> {
        return firestore.collection( this.coleccion ).doc( id ).set( obj as any );
    }

    /**
     * Borra el documento que corresponda al Identificador especificado.
     * @param {string} id Identificador del objeto en firestore
     * @returns {Promise<T>} Promesa con el objeto borrado en la BBDD.
     */
    public async deleteOne ( id : string ) : Promise<T> {
        const COLECCION = firestore.collection( this.coleccion );

        const obj = await COLECCION.doc( id );
        await obj.delete();

        return (await obj.get()).data() as T;
    }

    /**
     * Actualiza un documento.
     * @param {any} obj Objeto con los datos a actualizar dentro del documento. Puede contener solo los datos que se quieren actualizar/agregar.
     * @param {string} id Identificador del objeto a actualizar.
     * @returns 
     */
    public async updateOne ( obj : any, id : string ) : Promise<void> {
        return firestore.collection( this.coleccion ).doc( id ).update( obj as any );
    }

    GetClientesPorValidacion( validacion:string, onResult:any, onError:any){
        return firestore.collection(this.coleccion).where("validacion", "==", validacion).onSnapshot(onResult, onError);
    }

    GetClientesEnEspera( onResult:any, onError:any){
        return firestore.collection(this.coleccion).where("cliente.estado", "==", "en espera").onSnapshot(onResult, onError);
    }

    GetPedidosPorEstado( estado:string, onResult:any, onError:any){
        return firestore.collection(this.coleccion).where("estado", "==", estado).onSnapshot(onResult, onError);
    }

    GetItems( estado:string,tipo:string, onResult:any, onError:any){
        return firestore.collection(this.coleccion).where("estado", "==", estado).where("tipo", "==", tipo).onSnapshot(onResult, onError);
    }
    
    getUsuario (doc: string, onResult:any, onError:any) {
        return firestore.collection(this.coleccion).doc(doc).onSnapshot(onResult, onError);
    }

    getListaEspera (doc: string, onResult:any, onError:any) {
        return firestore.collection(this.coleccion).doc(doc).onSnapshot(onResult, onError);
    }

    getPedido (doc: string, onResult:any, onError:any) {
        return firestore.collection(this.coleccion).doc(doc).onSnapshot(onResult, onError);
    }

}