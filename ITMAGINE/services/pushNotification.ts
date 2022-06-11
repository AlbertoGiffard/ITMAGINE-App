import * as Notifications from 'expo-notifications';
import { AndroidImportance } from 'expo-notifications';

/**
 * Verifica permisos de notificación en la app.
 */
export const pedirPermisoDeNotifacion = Notifications.requestPermissionsAsync;

/**
 * Configura el manejador por defecto de notifiaciones para que se muestren como push notifications
 * @param {boolean} sonido Configura si la notificación debe tener sonido. Reproduce el sonido por defecto del dispositivo
 */
export const settearHandlerDeNotificacion = ( sonido : boolean ) => {
    Notifications.setNotificationHandler({
        handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: sonido,
            shouldSetBadge: true
        }}
    });
}

/**
 * Crea un canal de notificación. Es necesario para settear un sonido customizado de notificación.
 * @param {string} identificador Id del canal
 * @param {string} nombre Nombre del canal
 * @param {AndroidImportance} importancia Importancia de las notificaciones del canal
 * @param {string} sonidoBaseName Sonido a reproducir por parte de las notificaciones enviadas por este canal
 * @returns 
 */
export const crearCanalDeNotificacion = ( identificador : string, nombre: string, importancia: AndroidImportance, sonidoBaseName? : string ) => Notifications.setNotificationChannelAsync(
    identificador, 
    { sound: sonidoBaseName, name: nombre, importance: importancia }
)

/**
 * Crea una notifiación
 * @param titulo Titulo de la notifiación
 * @param cuerpo Cuerpo/descripción de la notificación
 * @param idCanal Identificador del canal donde se enviará la notificación. Si no se define se envía al canal por defecto
 */
export const crearNotificacion = async ( titulo : string, cuerpo : string, idCanal? : string ) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: titulo,
            body: cuerpo,
        },
        trigger: { seconds: 2, channelId: idCanal },
    });
}