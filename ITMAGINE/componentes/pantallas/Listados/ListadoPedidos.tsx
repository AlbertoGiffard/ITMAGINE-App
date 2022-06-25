
   
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { IPedido } from '../../../definiciones/IPedido';
import { PRIMARY_COLOR } from '../../../estilos/globalStyle';
import { COLECCION_PEDIDOS } from '../../../services/colecciones';
import { DBService } from '../../../services/DBService';
import CardPedido from '../../Cards/cardPedido';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ListadoPedidos = ( {estado}:{estado:string} ) => {

    let dbPedidos = new DBService<IPedido>(COLECCION_PEDIDOS);

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        return dbPedidos.GetPedidosPorEstado(estado, 
            (data:any) => {
                
                if(data != undefined){
                    const auxpedidos = data.docs.map((doc:any) => doc.data());
                    setPedidos(auxpedidos);
                }
            },
            (error:any) => console.log(error)
            );
    }, []);
    //pedidos = dbPedidos.getAll.then(obj => pedidos );

  return (
    <View style={styles.container}>
        <View style={styles.vwMarco}>
            <Text style={styles.tittle}> Pedidos {estado}s </Text>
                <FlatList
                    data={pedidos}
                    ItemSeparatorComponent={() => <Text style={{height: windowHeight * 0.01}}>  </Text>}
                    renderItem={({ item: pedido }) => <CardPedido {...pedido}></CardPedido>}
                />
        </View>
    </View>
  );

};



export default ListadoPedidos


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