import {Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image, ActivityIndicator, ImageBackground} from 'react-native'
import React, {useEffect, useState} from 'react'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../estilos/globalStyle';
import { DBService } from '../../services/DBService';


export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const CardProductoItem = (prod : any) => {

    //const dataBase:any = new DBService("clientes");

    const Preparar = () => {
        //dataBase.UpdteOne({estado:"aprobado"}, prod.email);
    }

    const Terminar = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.vwUsr}>
                <Text style={styles.textoNombre}>{prod.producto}</Text>
            </View>
            {prod.estado == "por preparar" ?
                <TouchableOpacity style={styles.vwprodTilde} onPress={Preparar}>
                    <Text style={styles.txtAceptar}>Preparar</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.vwprodTilde} onPress={Terminar}>
                    <Text style={styles.txtAceptar}>Terminar</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default CardProductoItem;


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
    vwUsr:{
        width: windowWidth * 0.5,
    },
    vwprodTilde:{
        width: windowWidth * 0.15,
        //backgroundColor: "black",
    },
    textoNombre:{
       color: PRIMARY_COLOR,
       fontSize: 20
    },
    txtAceptar: {
        height: windowHeight * 0.05,
        width: windowWidth * 0.23,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#32BA7C",
        textAlign: "center",
        textAlignVertical: "center",
        color: "white"
    },
})