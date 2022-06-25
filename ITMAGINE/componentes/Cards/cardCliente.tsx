import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ICliente } from '../../definiciones/ICliente';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR } from '../../estilos/globalStyle';
import { COLECCION_CLIENTES } from '../../services/colecciones';
import { DBService } from '../../services/DBService';


export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const CardCliente = (img : any) => {

    const dbService = new DBService<ICliente>(COLECCION_CLIENTES);

    const AceptarCliente = () => {
        dbService.updateOne({validacion:"aprobado"}, img.email);
    }

    const RechazarCliente = () => {
        dbService.updateOne({validacion:"rechazado"}, img.email);
    }

    console.log(img);

    return (
        <View style={styles.container}>
            <View style={styles.vwImg}>
                <Image source= {{ uri: img.fotoURL}} style={styles.img}></Image>
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
      height: windowHeight * 0.13,
      width: windowWidth * 0.9,
      flexDirection: "row",
      borderRadius: 30,
      borderWidth: 5,
      borderColor: SECONDARY_COLOR
    },
    vwImg:{
        width: windowWidth * 0.14,
        borderRadius: 30,
        marginRight: windowWidth * 0.02,
    },
    img:{
        borderWidth: 3,
        maxHeight: windowWidth * 0.17,
        borderColor: PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: 'center',
        height: windowWidth * 0.14,
        width: "100%",
        resizeMode: "center",
        
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