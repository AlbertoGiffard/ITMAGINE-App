
   
import React, {useState} from 'react';
import { Animated, FlatList, View, ScrollView, Dimensions, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { PRIMARY_COLOR } from '../../../estilos/globalStyle';
import CardProducto from '../../Cards/cardProducto';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MenuProducto = () => {
  
    const [total, setTotal] = useState(0);
    const arr:any = []
    const [arrayProd, setArrayProd] = useState(arr)
    
    const sumar = (producto:any) => {
        setTotal(total + producto.precio);
        arrayProd.push(producto)
        console.clear();
        console.log("-----------------------------------------");
        console.log("-----------------------------------------");
        console.log("-----------------------------------------");
        console.log(arrayProd)
    }

    const restar = (producto:any) => {
        setTotal(total - producto.precio);
        let i = 0
        for(i; i < arrayProd.length; i++ ){
            if(arrayProd[i].nombre == producto.nombre)
            break;

        }
        console.log("-----------------------------------------");
        console.log("-----------------------------------------");
        console.log("-----------------------------------------");
        arrayProd.splice(i, 1);
        console.log(arrayProd)
    }


  return (
    <View style={styles.container}>
        <View style={styles.vwMarco}>
            <SafeAreaView style={styles.scrollView}>
                <FlatList
                    data={Productos}
                    ItemSeparatorComponent={() => <Text style={{height: windowHeight * 0.01}}>  </Text>}
                    renderItem={({ item: producto}) => <CardProducto  producto={producto} sumar={sumar} restar={restar}></CardProducto>}
                />
            </SafeAreaView>
            <View style={styles.vwBtnEnviar}>
            <TouchableOpacity style={styles.btnEnviar}>
                <Text style={{fontSize: 22, fontStyle: "italic", fontWeight: "bold"}}>Realizar Pedido $ {total}</Text>
            </TouchableOpacity>
            </View>

        </View>
    </View>
  );
};


export default MenuProducto


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
        height: windowHeight * 0.82,
    },
    vwBtnEnviar:{
        justifyContent: "center",
        alignItems: 'center',
       height: windowHeight * 0.10,
       width: windowWidth * 0.8,
    },
    btnEnviar:{
        backgroundColor: PRIMARY_COLOR,
        height: windowHeight * 0.07,
        width: windowWidth * 0.8,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: 'center',
    }
    });

const Productos = [{nombre: "Milanesa con pure", descripcion: "Milanesa de pollo empanada con la mejor seleccion de pan fino, acompañado de pure de papá importada desde perú", tiempoPromedio: 15, precio: 400, tipo: "cocina",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_1.jpeg?alt=media&token=e174aaf5-9107-4dba-9be9-90311c3b85ae",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_2.jpeg?alt=media&token=998bda21-aefd-468b-9cc4-627f755cf10a",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_3.jpeg?alt=media&token=c7d4e382-f51a-4823-821f-ecb3a3aef2d1"]},
{nombre: "Ravioles con boloñesa", descripcion: "Ravioles de jamon y queso caceros, amasados bajo las manos de nuestros especialistas", tiempoPromedio: 10, precio: 350, tipo: "cocina",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_1.jpeg?alt=media&token=e174aaf5-9107-4dba-9be9-90311c3b85ae",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_2.jpeg?alt=media&token=998bda21-aefd-468b-9cc4-627f755cf10a",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_3.jpeg?alt=media&token=c7d4e382-f51a-4823-821f-ecb3a3aef2d1"]},
{nombre: "Pechuga a la plancha", descripcion: "Pechuga de pollo a la mostaza, acompañada con nuestra selección de especias", tiempoPromedio: 8, precio: 450, tipo: "cocina",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_1.jpeg?alt=media&token=e174aaf5-9107-4dba-9be9-90311c3b85ae",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_2.jpeg?alt=media&token=998bda21-aefd-468b-9cc4-627f755cf10a",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_3.jpeg?alt=media&token=c7d4e382-f51a-4823-821f-ecb3a3aef2d1"]},
{nombre: "Coca-Cola", descripcion: "Coca-cola de 600ml, botella de plástico", tiempoPromedio: 1, precio: 100, tipo: "bar",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_1.jpeg?alt=media&token=e174aaf5-9107-4dba-9be9-90311c3b85ae",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_2.jpeg?alt=media&token=998bda21-aefd-468b-9cc4-627f755cf10a",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_3.jpeg?alt=media&token=c7d4e382-f51a-4823-821f-ecb3a3aef2d1"]},
{nombre: "Cafe", descripcion: "Cafe de grano molido importado desde colombia", tiempoPromedio: 3, precio: 200, tipo: "bar",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_1.jpeg?alt=media&token=e174aaf5-9107-4dba-9be9-90311c3b85ae",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_2.jpeg?alt=media&token=998bda21-aefd-468b-9cc4-627f755cf10a",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_3.jpeg?alt=media&token=c7d4e382-f51a-4823-821f-ecb3a3aef2d1"]}
]
