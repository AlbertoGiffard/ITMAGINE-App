import {Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image, ActivityIndicator, ImageBackground} from 'react-native'
import React, {useEffect, useState} from 'react'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../estilos/globalStyle';
import { DBService } from '../../services/DBService';


export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const CardCliente = (img : any) => {

    const dataBase:any = new DBService("clientes");

    const AceptarCliente = () => {
        dataBase.UpdteOne({estado:"aprobado"}, img.email);
    }

    const RechazarCliente = () => {
        dataBase.UpdteOne({estado:"rechazado"}, img.email);
    }

    return (
        <View style={styles.container}>
            <View style={styles.vwImg}>
                <Image source={require('../../assets/bar.png')} style={styles.img}></Image>
            </View>
            <View style={styles.vwUsr}>
                <Text style={styles.textoNombre}>{img.nombre} {img.apellido}</Text>
                <Text style={styles.textoMail}>{img.email}</Text>
            </View>
            <TouchableOpacity style={styles.vwImgTilde} onPress={AceptarCliente}>
                <Image source={require('../../assets/comprobado.png')} style={styles.imgTilde}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.vwImgTilde} onPress={RechazarCliente}>
                <Image source={require('../../assets/cancelar.png')} style={styles.imgTilde}></Image>
            </TouchableOpacity>
        </View>
    )
}

export default CardCliente;


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
    vwImg:{
        width: windowWidth * 0.17,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: PRIMARY_COLOR,
        marginRight: windowWidth * 0.03,
        maxHeight: windowWidth * 0.17,
    },
    img:{
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: 'center',
        maxHeight: windowWidth * 0.17,
        maxWidth: windowWidth * 0.17
    },
    vwUsr:{
        width: windowWidth * 0.4,
    },
    vwImgTilde:{
        width: windowWidth * 0.13,
        //backgroundColor: "black",
    },
    imgTilde:{
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