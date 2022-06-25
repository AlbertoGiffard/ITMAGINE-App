import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ICliente } from '../../definiciones/ICliente';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR } from '../../estilos/globalStyle';
import { COLECCION_CLIENTES, COLECCION_COLA_ESPERA } from '../../services/colecciones';
import { DBService } from '../../services/DBService';


export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const CardProducto = (cli : any) => {

    const dbClientes = new DBService<ICliente>(COLECCION_CLIENTES);
    const dbEspera = new DBService(COLECCION_COLA_ESPERA);

    const AceptarCliente = () => {

        cli.cliente.estado = "activo"

        if(cli.email == undefined){ 
        dbEspera.updateOne({cliente: {...cli.cliente}}, cli.cliente.nombre);
        console.log(cli.cliente);    
        console.log(cli.nombre);    
        }
        else{
            dbEspera.updateOne({cliente: {...cli.cliente}}, cli.email);
            dbClientes.updateOne({estado: "activo"}, cli.email)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.vwcli}>
                { cli.cliente.email == undefined ?
                <Image source={require('../../assets/anonimo.png')} style={styles.cli}></Image> :
                <Image source={{uri: cli.cliente.fotoURL}} style={styles.cli}></Image>
                }
            </View>
            <View style={styles.vwUsr}>
                <Text style={styles.textoNombre}>{cli.cliente.nombre}{cli.cliente.apellido}</Text>
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
        marginRight: windowWidth * 0.03,
        maxHeight: windowWidth * 0.17,
    },
    cli:{
        borderRadius: 30,
        borderWidth: 3,
        borderColor: PRIMARY_COLOR,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: 'center',
        height: windowWidth * 0.15,
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
       color: TERCIARY_COLOR,
       fontSize: 24,
       textAlign: "center",
       textAlignVertical: "center"
    },
    textoMail:{
        color: TERCIARY_COLOR
    }
})