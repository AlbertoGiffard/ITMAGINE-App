
   
import React from 'react';
import { Animated, FlatList, View, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import { IPedido } from '../../../definiciones/IPedido';
import { PRIMARY_COLOR } from '../../../estilos/globalStyle';
import { DBService } from '../../../services/DBService';
import CardPedido from '../../Cards/cardPedido';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ListadoPedidos = ( {estado}:{estado:string} ) => {

    let dbPedidos = new DBService<IPedido>("pedidos");


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

const pedidos = [{key: 1,
id: 1,
cliente: "agustinclas@gmail.com",
numeroMesa: 25,
total: 2500,
productos:[1,2,3],
estado: "pendiente"},
{key: 2,
    id: 2,
    cliente: "a123nclas@gmail.com",
    numeroMesa: 27,
    total: 2500,
    productos:[1,2,3],
    estado: "pendiente"},
    {key: 3,
        id: 11,
        cliente: "ag131clas@gmail.com",
        numeroMesa: 28,
        total: 2500,
        productos:[1,2,3],
        estado: "pendiente"},
        {key: 4,
            id: 123,
            cliente: "agustinclas@gmail.com",
            numeroMesa: 21,
            total: 2500,
            productos:[1,2,3],
            estado: "pendiente"},
            {key: 5,
                id: 123,
                cliente: "agustinclas@gmail.com",
                numeroMesa: 22,
                total: 2500,
                productos:[1,2,3],
                estado: "pendiente"},
                {key: 5,
                    id: 123,
                    cliente: "agustinclas@gmail.com",
                    numeroMesa: 22,
                    total: 2500,
                    productos:[1,2,3],
                    estado: "pendiente"}]//pendiente, por preparar, en preparacion, preparado, entregado, confirmado, pagado}


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