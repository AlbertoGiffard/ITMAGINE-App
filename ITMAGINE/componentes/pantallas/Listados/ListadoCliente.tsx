
   
import React from 'react';
import { Animated, FlatList, View, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import CardCliente from '../../Cards/cardCliente';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ListadoCliente = () => {
  

  return (
    <View style={styles.container}>
        <View style={styles.vwMarco}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <FlatList
                    data={Clientes}
                    ItemSeparatorComponent={() => <Text style={{height: windowHeight * 0.01}}>  </Text>}
                    renderItem={({ item: cliente }) => <CardCliente {...cliente}></CardCliente>}
                />
            </ScrollView>
        </View>
    </View>
  );
};


export default ListadoCliente

const Clientes = [
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},

    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},

    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},

    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},

    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},

    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
    {email: "agustinclas@gmail.com", nombre:"Agustin", apellido:"Clas", dni: 15589745, fotoURL: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fagustinclasst123%40gmail.comimg1?alt=media&token=742de768-70b3-464b-973b-912d09ea47ae"},
]

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

