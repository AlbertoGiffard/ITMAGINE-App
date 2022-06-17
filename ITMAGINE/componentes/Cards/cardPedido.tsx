import {Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image, ActivityIndicator, ImageBackground} from 'react-native'
import React, {useEffect, useState} from 'react'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../estilos/globalStyle';
import { DBService } from '../../services/DBService';
import { pedirPermisoDeNotifacion } from '../../services/pushNotification';


export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

let contador = 0;

const CardPedidoPendiente = (pend : any) => {

    const dataBase:any = new DBService("clientes");
    const [viewState, setViewState] = useState(true)


    const AceptarPedido = () => {
        //dataBase.UpdteOne({estado:"aprobado"}, pend.email);
        setViewState(false);
    }

    const EntregrarPedido = () => {
        //dataBase.UpdteOne({estado:"aprobado"}, pend.email);
        setViewState(false);
    }

    return (
        <View>
        { viewState && 
        <View style={styles.container}>
            <View style={styles.vwTop}>
                <View style={styles.vwpend}>
                    <Image source={require('../../assets/bar.png')} style={styles.pend}></Image>
                </View>
                <View style={styles.vwUsr}>
                    <Text style={styles.textoNombre}>{pend.cliente}</Text>
                    <Text style={styles.textoMail}>Mesa: {pend.numeroMesa}</Text>
                </View>
                {pend.estado == "pendiente" ?
                <TouchableOpacity style={styles.vwpendTilde} onPress={AceptarPedido}>
                    <Text style={styles.txtAceptar}>ACEPTAR</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.vwpendTilde} onPress={AceptarPedido}>
                    <Text style={styles.txtAceptar}>ENTREGAR</Text>
                </TouchableOpacity>
                }
            </View>
            {
                pend.productos.map((obj:any, index:number) => {
                    contador++;
                    return( 
                    <View key={index}>
                        <Text style={styles.textoProducto}>{contador}</Text>
                    </View>
                    )
                })
            }
            <Text style={{height: windowHeight * 0.02}}></Text>
        </View> }
        </View>
    )
}

export default CardPedidoPendiente;

const pedidos = [{
    id: 1,
    cliente: "agustinclas@gmail.com",
    numeroMesa: 24,
    total: 2500,
    productos:[1,2,3],
    estado: "pendiente"}]


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      width: windowWidth * 0.9,
      borderRadius: 30,
      borderWidth: 5,
      borderColor: SECONDARY_COLOR,
    },
    vwTop:{
        justifyContent: "center",
        alignItems: 'center',
        height: windowHeight * 0.1,
        width: windowWidth * 0.9,
        flexDirection: "row",
    },
    vwpend:{
        width: windowWidth * 0.17,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: PRIMARY_COLOR,
        marginRight: windowWidth * 0.03,
        maxHeight: windowWidth * 0.17,
    },
    pend:{
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: 'center',
        maxHeight: windowWidth * 0.17,
        maxWidth: windowWidth * 0.17
    },
    vwUsr:{
        width: windowWidth * 0.4,
    },
    vwpendTilde:{
        width: windowWidth * 0.25,
        //backgroundColor: "black",
    },
    pendTilde:{
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
    textoProducto:{
        color: PRIMARY_COLOR
     },
})