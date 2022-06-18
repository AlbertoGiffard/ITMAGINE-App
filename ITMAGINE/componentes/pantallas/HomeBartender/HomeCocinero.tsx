
   
import React from 'react';
import { Animated, FlatList, View, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
//import { DBService } from '../../../services/DBService';
import ListadoProductos from '../Listados/ListadoProductos';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeCocinero = () => {
  
    //let db:any = new DBService("HomeBartender");
    //let clientesAux = db.getAll();

  return (
    <View style={styles.container}>
        <View style={styles.vwMarco}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    snapToAlignment="start"
                    contentContainerStyle={{
                      paddingHorizontal: windowHeight * 0.001,
                    }}
                    snapToInterval={windowWidth}
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    data={componentes}
                    renderItem={({ item: componente }) => {
                        return (
                          componente
                        );
                    }}
                />
            </ScrollView>
        </View>
    </View>
  );
};

//Aca se llama segun tipo
const componentes:any = [<ListadoProductos estado='por preparar' tipo="cocina"></ListadoProductos>, <ListadoProductos estado='en preparacion' tipo="cocina"></ListadoProductos>];

export default HomeCocinero

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

