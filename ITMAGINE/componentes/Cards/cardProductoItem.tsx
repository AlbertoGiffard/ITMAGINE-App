import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IItemPedido } from '../../definiciones/IItemPedido';
import { IPedido } from '../../definiciones/IPedido';
import { SECONDARY_COLOR, TERCIARY_COLOR } from '../../estilos/globalStyle';
import { COLECCION_PEDIDOS } from '../../services/colecciones';
import { DBService } from '../../services/DBService';


export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const CardProductoItem = (prod : any) => {

    const dataBase = new DBService<IItemPedido>("ItemsPedidos");
    const dbPedidos = new DBService<IPedido>(COLECCION_PEDIDOS);

    const Preparar = () => {
        dataBase.updateOne({estado: "en preparacion"}, prod.idItem)
    }

    const Terminar = () => {
        dataBase.updateOne({estado: "preparado"}, prod.idItem).then(() => { 

            dataBase.getAllPreparados(prod.idPedido).then(obj => {
                
                let flag = true;
                obj.forEach(element =>{
                    if(element.estado != "preparado") flag = false
                })
    
                if(flag) { dbPedidos.updateOne({estado: "preparado"}, prod.idPedido.toString()).then(data => console.log(data)); console.log("abbbbbbba"); console.log(prod.idPedido);}
                else console.log("aaaaa");
    
            })}
        );

    }

    return (
        <View style={styles.container}>
            <View style={styles.vwUsr}>
                <Text style={styles.textoNombre}>{prod.cantidad} {prod.nombre}</Text>
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
       color: TERCIARY_COLOR,
       fontSize: 25,
       textAlign: "center"
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