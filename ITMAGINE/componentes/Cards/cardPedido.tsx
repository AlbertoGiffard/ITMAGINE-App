import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IItemPedido } from '../../definiciones/IItemPedido';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR } from '../../estilos/globalStyle';
import { COLECCION_PEDIDOS } from '../../services/colecciones';
import { DBService } from '../../services/DBService';


export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const CardPedidoPendiente = (pend : any) => {

    const dataBase = new DBService(COLECCION_PEDIDOS);
    const dbItemsPedidos = new DBService<IItemPedido>("ItemsPedidos");


    const AceptarPedido = () => {
        dataBase.updateOne({estado: "por preparar"}, pend.id.toString());

        pend.productos.forEach((obj:any) => {
            const auxItemPedido:IItemPedido = {
                nombre: obj.producto.nombre,
                estado: "por preparar",
                idItem: pend.id + obj.producto.nombre,
                idPedido: pend.id,
                cantidad: obj.cantidad,
                tipo: obj.producto.tipo
            }
            dbItemsPedidos.insertOne(auxItemPedido,pend.id + obj.producto.nombre)
        })
    }

    const EntregarPedido = () => {
        dataBase.updateOne({estado: "entregado"}, pend.id.toString())
    }

    return (
        <View style={styles.container}>
            <View style={styles.vwTop}>
                <View style={styles.vwpend}>
                    <Image source={require('../../assets/bar.png')} style={styles.pend}></Image>
                </View>
                <View style={styles.vwUsr}>
                    <Text style={styles.textoNombre}> {pend.cliente.nombre} </Text>
                    <Text style={styles.textoMesa}>Mesa: {pend.numeroMesa}</Text>
                </View>
                {pend.estado == "pendiente" ?
                <TouchableOpacity style={styles.vwpendTilde} onPress={AceptarPedido}>
                    <Text style={styles.txtAceptar}>ACEPTAR</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.vwpendTilde} onPress={EntregarPedido}>
                    <Text style={styles.txtAceptar}>ENTREGAR</Text>
                </TouchableOpacity>
                }
            </View>
            {
                pend.productos.map((obj:any, index:number) => {
                    contador++;
                    return( 
                    <View key={index}>
                        <Text style={styles.textoProducto}>{obj.cantidad} {obj.producto.nombre}</Text>
                    </View>
                    )
                })}
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
       color: SECONDARY_COLOR,
       textAlign: "center",
        fontSize: 20
    },
    textoMesa:{
        color: TERCIARY_COLOR,
        textAlign: "center",
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
    textoProducto:{
        color: PRIMARY_COLOR,
        textAlign: "center",
        fontSize: 15
     },
})