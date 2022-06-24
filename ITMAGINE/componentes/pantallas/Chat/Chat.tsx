import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { Title } from "react-native-paper";
import { AppContext } from "../../../context/AppContext";
import { IChatMozoCliente } from "../../../definiciones/IChatMozoCliente";
import { PRIMARY_COLOR_DISABLED, windowHeight, windowWidth } from "../../../estilos/globalStyle";
import { COLECCION_CHAT_MOZO_CLIENTE } from "../../../services/colecciones";
import firebase from "../../../utils/firebase";



export const Chat = () => {
    const DBChat = firebase.firestore().collection(COLECCION_CHAT_MOZO_CLIENTE);
    const [chat, setChat] = useState<IChatMozoCliente | undefined>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");
    const [idUsuario, setIdUsuario] = useState<string>("");
    const [habilitarEnviar, setHabilitarEnviar] = useState<boolean>(false);
    const {usuario, mesa} = useContext(AppContext);

    if (!mesa && !usuario.CUIL) return <Text>Para utilizar esta funcionalidad se debe encontrar en una mesa...</Text>    
    
    useEffect( () => {
        if ( usuario instanceof String ) setIdUsuario(usuario as string);
        else setIdUsuario(usuario.email);

        return DBChat.onSnapshot( 
            (snapshot) => {
                setErrorMsg("");
                snapshot.docs
                const chats = snapshot.docs.map( doc => doc.data() as IChatMozoCliente );
                const chatsNoAsignados = chats.filter( chat => !chat.emailMozo );

                if ( usuario.CUIL ) {
                    const chatPropio = chats.find( chat => chat.emailMozo === usuario.email );

                    if ( !chatPropio ) {
                        if ( chatsNoAsignados.length === 0 ) {
                            setErrorMsg("No hay preguntas!")
                            return
                        }
                        const nuevoChat = chatsNoAsignados[0];
                        nuevoChat.emailMozo = usuario.email;
                        setChat( nuevoChat );
                        return
                    }

                    setChat(chatPropio);
                    return
                }

                const chatPropio = chats.find( chat => chat.mesa.numero === mesa?.numero )
                setChat(chatPropio);
            },
            (err) => {

            }
        )

    }, [] );

    useEffect( () => {

        if (!chat && !usuario.CUIL && mesa) {
            const nuevoChat : IChatMozoCliente = {
                id: `ChatMesa${mesa.numero}`,
                mensajes: [],
                mesa: mesa
            }
            DBChat.doc(nuevoChat.id).set(nuevoChat);
            return
        }

        if ( chat && usuario.CUIL ) {
            DBChat.doc( chat.id ).get()
                .then( doc => doc.data() as IChatMozoCliente )
                .then( data => data.emailMozo === undefined )
                .then( noTieneEmail => noTieneEmail ? DBChat.doc( chat.id ).update(chat) : undefined );
        }

    }, [chat] );

    const mostrarMensajes = () => {
        if (!chat) return
        
        if (!chat.mensajes) return <Text style={styles.textUsers}>{"Animate, hacé la consulta que quieras! ;)"}</Text>

        return chat.mensajes
            .sort( (m1, m2) => m1.fecha.seconds - m2.fecha.seconds )
            .map( (mensaje, index) => {
                
                return <View key={index} style={ mensaje.emisor === idUsuario ? styles.chatMessagePropio : styles.chatMessage }>
                    <Title>{mensaje.emisor}</Title>
                    <Text>{mensaje.mensaje}</Text>
                    <Text>{ (new Date(mensaje.fecha.seconds * 1000)).toLocaleTimeString() }</Text>
                </View>

            } )
    }

    const enviarMensaje = () => {
        if(!chat) return
        const fecha = new Date();

        chat.mensajes.push({ mensaje, emisor: idUsuario, fecha });

        DBChat.doc( chat.id ).set(chat);
    }

    return (
        <View
            style={styles.container}>
            <View style={styles.formMarco}>
                <ScrollView style={styles.chatMessages}>
                    {mostrarMensajes()}
                </ScrollView>
                <View style={styles.chatSendContainer}>
                    <TextInput onChangeText={ (mensaje) => { 
                        if (mensaje.length === 0) return setHabilitarEnviar(false);
                        setMensaje(mensaje);
                        setHabilitarEnviar(true);
                     } } style={styles.input}/>
                    <TouchableOpacity disabled={!habilitarEnviar} onPress={ enviarMensaje } style={styles.button}>
                        <Text style={styles.textUsers}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      backgroundColor: "black",
      alignContent: "space-between"
    },
    chatSendContainer: {
        width: windowWidth,
        flexDirection:"row",
        alignItems: "baseline",
    },
    chatMessages: {
        height: "70%",
        flex: 1,
        flexDirection: "column",
        alignContent: "center"
    },
    chatMessage: {
        borderRadius: 50,
        width: windowWidth * 0.9,
        backgroundColor: PRIMARY_COLOR_DISABLED,
        padding: 10,
        margin: 5
    },
    chatMessagePropio: {
        borderRadius: 50,
        width: windowWidth * 0.9,
        backgroundColor: "#FFFFFFB5",
        padding: 10,
        margin: 5
    },
    formMarco: {
      marginHorizontal: 30,
      height: windowHeight * 0.90,
      borderRadius: 40,
      width: windowWidth * 0.99,
      justifyContent: "center",
      alignItems: 'center',
      shadowColor: "#fd99ef",
      shadowOpacity: 1,
      elevation: 250,
      shadowOffset: { width: 0, height: 0 },
      flex: 1
    },
    form: {
      marginHorizontal: 30,
      height: windowHeight * 0.90,
      borderRadius: 40,
      width: windowWidth * 0.95,
      justifyContent: "center",
      alignItems: 'center',
      borderColor: '#3dd7fb',
      borderWidth: 5,
      borderStyle: 'solid',
    },
    vwImg: {
      height: windowHeight * 0.2,
      borderRadius: 40,
      width: windowWidth * 0.8,
      //backgroundColor: 'blue'
  
    },
    Img: {
      maxHeight: "100%",
      maxWidth: "100%"
    },
    vwLogin: {
      height: windowHeight * 0.3,
      width: windowWidth * 0.8,
      marginTop: windowHeight * 0.05,
      //backgroundColor: 'green'
  
    },
    input: {
      borderBottomColor:
        "#ffe045",
      borderBottomWidth: 5,
      height: 58,
      marginBottom: 0,
      fontSize: 16,
      borderRadius: 10,
      padding: 0,
      width: windowWidth * 0.8,
      color: "#fd99ef"
    },
    whiteSheet: {
      width: '100%',
      height: '75%',
      position: "absolute",
      bottom: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 60,
    },
    button: {
      borderColor: '#fd99ef',
      borderWidth: 3,
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      width: windowWidth * 0.2,
  
    },
    buttonUsers: {
      width: windowWidth * 0.8,
      height: windowHeight * 0.20,
      top: 50,
      justifyContent: "center",
      alignItems: 'center',
      marginBottom: windowHeight * 0.05,
      //backgroundColor: 'red'
    },
    buttonUser: {
      justifyContent: "center",
      alignItems: 'center',
      height: windowHeight * 0.06,
      borderBottomColor: "#fd99ef",
      borderBottomWidth: 1,
      borderTopColor: "#fd99ef",
      borderTopWidth: 1,
      width: windowWidth * 0.7,
      borderRadius: 10,
    },
    buttonRegistro: {
  
      marginBottom: windowHeight * 0.035,
    },
    textUsers: {
      fontSize: windowHeight * 0.02,
      fontWeight: 'bold',
      color: "#ffe045",
    },
    errorMessage: {
      color: "red",
      fontSize: 20,
    },
  });