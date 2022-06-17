import {Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image, ActivityIndicator, ImageBackground} from 'react-native'
import React, {useEffect, useState} from 'react'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../estilos/globalStyle';
//import { DBService } from '../../services/DBService';


export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const CardProducto = (cli : any) => {

    //const dataBase:any = new DBService("clientes");

    const AceptarCliente = () => {
        //dataBase.UpdteOne({estado:"aprobado"}, cli.email);
    }

    return (
        <View style={styles.container}>
            <View style={styles.vwcli}>
                <Image source={require('../../assets/bar.png')} style={styles.cli}></Image>
            </View>
            <View style={styles.vwUsr}>
                <Text style={styles.textoMail}>{cli.email}</Text>
                <Text style={styles.textoNombre}>{cli.fecha}</Text>
            </View>
            <TouchableOpacity style={styles.vwcliTilde} onPress={AceptarCliente}>
                <Image source={require('../../assets/comprobado.png')} style={styles.cliTilde}></Image>
            </TouchableOpacity>
        </View>
    )
}

export default CardProducto;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      height: windowHeight * 0.1,
      width: windowWidth * 0.9,
      flexDirection: "row",
      borderRadius: 30,
      borderWidth: 5,
      borderColor: SECONDARY_COLOR
    },
    vwcli:{
        width: windowWidth * 0.17,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: PRIMARY_COLOR,
        marginRight: windowWidth * 0.03,
        maxHeight: windowWidth * 0.17,
    },
    cli:{
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: 'center',
        maxHeight: windowWidth * 0.17,
        maxWidth: windowWidth * 0.17
    },
    vwUsr:{
        width: windowWidth * 0.4,
    },
    vwcliTilde:{
        width: windowWidth * 0.13,
        //backgroundColor: "black",
    },
    cliTilde:{
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: 'center',
        maxHeight: windowHeight * 0.10,
        maxWidth: windowWidth * 0.12,
    },
    textoNombre:{
       color: SECONDARY_COLOR
    },
    textoMail:{
        color: TERCIARY_COLOR
    }
})