

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IChatMozoCliente } from '../../../definiciones/IChatMozoCliente';
import { COLECCION_CHAT_MOZO_CLIENTE } from '../../../services/colecciones';
import { crearNotificacion } from '../../../services/pushNotification';
import firebase from '../../../utils/firebase';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const MenuMozo = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsgInicio, setErrorMsgInicio] = useState(false);
    let errorMessage;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const DBChat = firebase.firestore().collection(COLECCION_CHAT_MOZO_CLIENTE);

    useEffect( () => {
      DBChat.onSnapshot(
        (snapshot) => {
          const chats = snapshot.docs.map( doc => doc.data() as IChatMozoCliente );

          chats.forEach( (chat) => {
            if (!chat.emailMozo) {
              return crearNotificacion( `Consulta de Mesa ${chat.mesa.numero}`, "Hay una nueva consulta para responder!" )
            }
          } );

        }
      )
    }, [] );

    const NavegarPedidos = () => {
      navigation.navigate( 'Carga', { siguientePantalla: 'PedidosMozo' } )
    }

    const NavegarChat = () => {
      navigation.navigate( 'Carga', { siguientePantalla: 'Chat' } )
    }
    
  return (
    <KeyboardAvoidingView
      style = {styles.container}
    >
        <View style={styles.formMarco}>
          <SafeAreaView style={styles.form}>
            <View style={styles.vwImg}>
              <Image source = {require("../../../assets/bar.png")} style={styles.Img}></Image>
            </View>
            <View style={styles.vwLogin}>
                <TouchableOpacity style={styles.button} onPress={NavegarPedidos}>
                    <Text style={styles.buttonText}>PEDIDOS</Text>
                </TouchableOpacity>
                
            </View>
            <View  style = {styles.vwLogin}>
                <TouchableOpacity
                    onPress = {NavegarChat}
                    style = {styles.button}
                >
                    <Text style={styles.buttonText}>CHAT</Text>
                </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      <StatusBar barStyle="light-content" />
    </KeyboardAvoidingView>
  );
}

export default MenuMozo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor:"black"
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
    shadowOffset:{width: 0, height: 0}
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
  vwImg:{
    height: windowHeight * 0.2,
    borderRadius: 40,
    width: windowWidth * 0.8,
  },
  Img:{
    maxHeight: "100%",
    maxWidth: "100%"
  },
  vwLogin:{
    height: windowHeight * 0.30,
    width: windowWidth * 0.8,
  },
    button: {
      borderColor: '#fd99ef',
      borderWidth: 3,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      width: windowWidth * 0.8,
      height: windowHeight * 0.22,

    },
    buttonText:{fontWeight: 'bold', color: '#3dd7fb', fontSize: 28}
    
});

//primarycolor: #fd99ef rosadito
//secondary color: #3dd7fb azulito
//terciary color: #ffe045 amarillo
//bg color: #040104 negro de fondo