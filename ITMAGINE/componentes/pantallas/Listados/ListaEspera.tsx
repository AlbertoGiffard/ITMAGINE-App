
   
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { COLECCION_COLA_ESPERA } from '../../../services/colecciones';
import { DBService } from '../../../services/DBService';
//import { DBService } from '../../../services/DBService';
import CardEspera from '../../Cards/cardEspera';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ListaEspera = () => {
  
    const [clientes, setClientes] = useState([])
    const dbService = new DBService<IEspera>(COLECCION_COLA_ESPERA);

    useEffect(() => {
        return dbService.GetClientesEnEspera(
            (data:any) => {
                
                if(data != undefined){
                    const auxClientes = data.docs.map((doc:any) => doc.data());
                    setClientes(auxClientes);
                }
            },
            (error:any) => console.log(error)
            );
    }, []);
    //let db:any = new DBService("listaEspera");
    //let clientesAux = db.getAll();

  return (
    <View style={styles.container}>
        <View style={styles.vwMarco}>
            <FlatList
                data={clientes}
                ItemSeparatorComponent={() => <Text style={{height: windowHeight * 0.01}}>  </Text>}
                renderItem={({ item: cliente }) => <CardEspera {...cliente}></CardEspera>}
            />
        </View>
    </View>
  );
};


export default ListaEspera

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"black"
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
    scrollView:{
        justifyContent: "center",
         alignItems: 'center',
        height: windowHeight * 0.85,
    }
    });

