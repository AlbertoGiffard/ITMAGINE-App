
   
import React, {useEffect, useState} from 'react';
import { Animated, FlatList, View, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import { DBService } from '../../../services/DBService';
import CardCliente from '../../Cards/cardCliente';
import { ICliente } from '../../../definiciones/ICliente';
import { COLECCION_CLIENTES } from '../../../services/colecciones';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ListadoCliente = () => {
  
    const [clientes, setClientes] = useState([])
    const dbService = new DBService<ICliente>(COLECCION_CLIENTES);

    useEffect(() => {
        dbService.GetClientesPorValidacion(
            "en proceso",
            (data:any) => {
                
                if(data != undefined){
                    const auxClientes = data.docs.map((doc:any) => doc.data());
                    setClientes(auxClientes);
                }
              },
              (error:any) => console.log(error)
        
            );
    }, []);


  return (
    <View style={styles.container}>
        <View style={styles.vwMarco}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <FlatList
                    data={clientes}
                    ItemSeparatorComponent={() => <Text style={{height: windowHeight * 0.01}}>  </Text>}
                    renderItem={({ item: cliente }) => <CardCliente {...cliente}></CardCliente>}
                />
            </ScrollView>
        </View>
    </View>
  );
};


export default ListadoCliente

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

