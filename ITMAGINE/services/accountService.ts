import fb from "../utils/firebase";
import uuid from 'react-native-uuid';
import { ICliente } from "../definiciones/ICliente";
import { sendEmailVerification } from "firebase/auth";

const CARPETA_FOTOS_DE_PERFIL = "Fotos_de_Perfil";
const STORAGE_URL = 'gs://itmagine-41544.appspot.com';

export const logIn = ( usuario : ICliente ) => {
    return fb.auth().signInWithEmailAndPassword( usuario.email, usuario.password );
}

export const register = ( usuario : ICliente ) => {
    return fb.auth().createUserWithEmailAndPassword( usuario.email, usuario.password );
}

export const registerWithValidation = async ( usuario : ICliente ) => {
    try {
        const user = await (await register(usuario)).user;
        if (!user) throw new Error( "Error de registro en firebase!" );
    
        await sendEmailVerification(user)
    } catch( err ) {
        throw new Error("Error de registro en firebase!")
    }
}

export const uploadImage = async ( uriImage : string, email : string ) => {
    const img = (await (await fetch(uriImage)).blob());
    const imgRefName = uuid.v4().toString();
    const path = `${CARPETA_FOTOS_DE_PERFIL}/${email}/${imgRefName}`;
    const ref = fb.storage(STORAGE_URL).ref( path );
    (await ref.put(img));
    return await ref.getDownloadURL();
}