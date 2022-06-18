import checkEmail from 'validator/lib/isEmail';
import checkStrEmpty from 'validator/lib/isEmpty';
import isAlpha from 'validator/lib/isAlpha';
import isNumeric from 'validator/lib/isNumeric';
import isAlphaNumeric from 'validator/lib/isAlphanumeric';

export const verificarNoVacio = ( valor : string ) => !checkStrEmpty(valor);

export const verificarEmail = ( email : string ) => checkEmail( email );

export const verificarSoloAlfabeticos = ( valor : string ) => isAlpha( valor.replace(/\s+/g, ''), "es-ES" );

export const verificarSoloNumeros = ( valor : string ) => isNumeric( valor );

export const verificarSoloAlfaNumericos = ( valor : string ) => isAlphaNumeric( valor.replace(/\s+/g, ''), "es-AR" );