
   
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { IItemPedido } from '../../../definiciones/IItemPedido';
import { PRIMARY_COLOR } from '../../../estilos/globalStyle';
import { DBService } from '../../../services/DBService';
import { crearNotificacion } from '../../../services/pushNotification';
import CardProductoItem from '../../Cards/cardProductoItem';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ListadoProductos = ( {estado, tipo}:{estado:string, tipo:string} ) => {

    let dbItemPedidos = new DBService<IItemPedido>("ItemsPedidos");
    const [productos, setProductos] = useState([])

    useEffect(() => {
        dbItemPedidos.GetItems(estado, tipo, 
            (data:any) => {
                
                if(data != undefined){
                    const auxproductos = data.docs.map((doc:any) => doc.data());
                    setProductos(auxproductos);
                    crearNotificacion( `Nuevo Pedido!`, "Hay nuevos pedidos para preparar!" )
                }
            },
            (error:any) => console.log(error)
            );
    }, []);

  return (
    <View style={styles.container}>
        <View style={styles.vwMarco}>
            <Text style={styles.tittle}> Pedidos {estado} </Text>
                <FlatList
                    data={productos}
                    ItemSeparatorComponent={() => <Text style={{height: windowHeight * 0.01}}>  </Text>}
                    renderItem={({ item: pedido }) => <CardProductoItem {...pedido}></CardProductoItem>}
                />
        </View>
    </View>
  );

};


export default ListadoProductos

//pendiente, por preparar, en preparacion, preparado, entregado, confirmado, pagado}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"black",
        width: windowWidth
      },
      vwMarco: {
        marginHorizontal: 30,
        height: windowHeight * 0.90,
        borderRadius: 40,
        width: windowWidth * 0.99,
        shadowColor: "#fd99ef",
        shadowOpacity: 1,
        elevation: 250,
        shadowOffset:{width: 0, height: 0},
        justifyContent: "center",
        alignItems: 'center',
        marginTop: windowHeight * 0.10,
    },
    tittle:{
        height: windowHeight * 0.10,
        width: windowWidth * 0.90,
        color: PRIMARY_COLOR,
        fontSize: 30,
        justifyContent: "center",
        textAlign: "center"
    },
    scrollView:{
        justifyContent: "center",
        alignItems: 'center',
        height: windowHeight * 0.85,
    }
    });