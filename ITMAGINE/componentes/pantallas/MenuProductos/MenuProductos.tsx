
   
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {useState, useEffect, useContext} from 'react';
import { Animated, FlatList, View, ScrollView, Dimensions, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import CardProducto from '../../Cards/cardProducto';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../../estilos/globalStyle';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MenuProducto = () => {
  
    const [total, setTotal] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const arr:any = []
    const [arrayProd, setArrayProd] = useState(arr)
    const navigation = useNavigation<NativeStackNavigationProp<any>>()
    const context = useContext(AppContext);
    
    useEffect(() => {
      setTotal(0);
      setTiempo(0);
      setArrayProd(arr);
      console.log("tukiiii");
    }, [])
    

    const sumar = (producto:any) => {
        setTotal(total + producto.producto.precio * producto.cantidad);
        arrayProd.push(producto);        
        CalcularPrecio();
        CalcularTiempo(producto.producto.tiempoPromedio, true);
    }

    const restar = (producto:any, opcion:boolean) => {
        let i = 0
        for(i; i < arrayProd.length; i++ ){
            if(arrayProd[i].producto.nombre == producto.nombre)
            break;
        }
        arrayProd.splice(i, 1);

        if(opcion){
            CalcularPrecio();
            CalcularTiempo(producto.tiempoPromedio, false);
        }
    }

    const CalcularPrecio = () => {

        let suma = 0;
        arrayProd.forEach((element:any) => {
            suma = (element.producto.precio * element.cantidad) + suma
        });

        setTotal(suma);
    }

    const CalcularTiempo = (tiempoProm : number, suma:boolean) => {
        if(suma && tiempo <= tiempoProm) setTiempo(tiempoProm);

        if(!suma){
            let aux = 0;
            arrayProd.forEach((element:any) => {
                if(aux < element.producto.tiempoPromedio) aux = element.producto.tiempoPromedio
            });

            setTiempo(aux);
        }
    }

    const EnviarPedido = () => {     
          
        
        if(context != null){ 
            
            let numMesa = context.mesa?.numero;
            let usuario = context?.usuario;

            if(numMesa != undefined)
                context.pedido = {
                    id: Math.floor(Math.random() * (1000 - 0 + 1) + 0),
                    cliente: usuario,
                    numeroMesa: numMesa,
                    productos: arrayProd,
                    estado: "pendiente",
                    total: total,
                    tiempoProm: tiempo
        }}


        navigation.navigate( 'Carga', {siguientePantalla: 'ListadoPedido' } )
    }
    
    const NavegarChat = () => {
        navigation.navigate( 'Carga', {siguientePantalla: 'Chat' } )
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
            <TouchableOpacity onPress={NavegarChat} style={styles.btnMozo}>
                <Image source={require("../../../assets/mesero.png")} style={styles.imgReloj}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={EnviarPedido} style={styles.btnEnviar}>
                <Text style={{fontSize: 21, fontStyle: "italic", fontWeight: "bold"}}>Pedir $ {total}</Text>
                <View style = {styles.vwReloj}>
                        <Text style = {styles.txtReloj}>{tiempo}</Text>
                        <Image source={require("../../../assets/reloj.png")} style={styles.imgReloj}></Image>
                    </View>
            </TouchableOpacity>
            </View>

        </View>
    </View>
  );
};


export default MenuProducto


const Productos = [{nombre: "Milanesa con pure", descripcion: "Milanesa de pollo empanada con la mejor seleccion de pan fino, acompañado de pure de papá importada desde perú", tiempoPromedio: 15, precio: 400, tipo: "cocina",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_1.jpeg?alt=media&token=e174aaf5-9107-4dba-9be9-90311c3b85ae",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_2.jpeg?alt=media&token=998bda21-aefd-468b-9cc4-627f755cf10a",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2FMilanga_Con_Pure_3.jpeg?alt=media&token=c7d4e382-f51a-4823-821f-ecb3a3aef2d1"]},
{nombre: "Ravioles con boloñesa", descripcion: "Ravioles de jamon y queso caceros, amasados bajo las manos de nuestros especialistas", tiempoPromedio: 10, precio: 350, tipo: "cocina",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fravioles1.jpeg?alt=media&token=e77e0b20-7b4f-4bb7-b1f8-c8e9db7dce16",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fravioles2.jpeg?alt=media&token=1b540405-cc45-46ee-8152-12e71803b367",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fravioles3.jpeg?alt=media&token=fe232c8d-815a-45b4-9798-d7276bc36e1c"]},
{nombre: "Pechuga a la plancha", descripcion: "Pechuga de pollo a la mostaza, acompañada con nuestra selección de especias", tiempoPromedio: 8, precio: 450, tipo: "cocina",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fpechuga1.jpeg?alt=media&token=d6297fa1-0466-4cc5-9222-3ba924872f77",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fpechuga2.jpeg?alt=media&token=b1b07e82-b360-4c99-86b9-1ecc78ce8ffe",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fpechuga3.jpeg?alt=media&token=6cedad38-28bc-4ce8-b248-1fa9d2e0fa5f"]},
{nombre: "Coca-Cola", descripcion: "Coca-cola de 600ml, botella de plástico", tiempoPromedio: 1, precio: 100, tipo: "bar",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fcoca1.jpeg?alt=media&token=5186aae5-7bd3-40d4-a821-373e835ee044",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fcoca2.jpeg?alt=media&token=033d6bb5-da65-40ef-97fb-f30258f0a4a5",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fcoca3.png?alt=media&token=1d04febd-cf0b-4af3-a1b8-f72e2861252e"]},
{nombre: "Cafe", descripcion: "Cafe de grano molido importado desde colombia", tiempoPromedio: 3, precio: 200, tipo: "bar",
imagenes: ["https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fcafe2.jpeg?alt=media&token=efb92e32-7663-472f-b7f5-6f017fbac0a8",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fcafe1.jpeg?alt=media&token=f7498778-82e4-404d-b7aa-429079a3490e",
"https://firebasestorage.googleapis.com/v0/b/itmagine-41544.appspot.com/o/Comidas%2Fcafe3.jpeg?alt=media&token=f9cc54a4-722f-4e7d-a6a1-5b6dd777fd36"]}
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
        height: windowHeight * 0.82,
    },
    vwBtnEnviar:{
        justifyContent: "center",
        alignItems: 'center',
       height: windowHeight * 0.10,
       width: windowWidth,
       flexDirection: "row"
    },
    btnEnviar:{
        backgroundColor: PRIMARY_COLOR,
        height: windowHeight * 0.07,
        width: windowWidth * 0.65,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row",
        marginLeft: windowWidth * 0.03,
    },
    btnMozo:{
        backgroundColor: PRIMARY_COLOR,
        height: windowHeight * 0.07,
        width: windowWidth * 0.20,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: 'center',
        marginRight: windowWidth * 0.03,
    },
    vwReloj:{
        justifyContent: "center",
        alignItems: 'center',
        height: windowHeight * 0.05,
        width: windowWidth * 0.22,
        flexDirection: "row",
    },
    txtReloj:{
        height: windowHeight * 0.05,
        width: windowWidth * 0.08,
        fontSize: 25,
        color: TERCIARY_COLOR,
        textAlignVertical: "center",
        textAlign: "right"
    },
    imgReloj:{
        maxHeight: "95%",
        maxWidth: windowWidth * 0.13,
        resizeMode: "contain",
    },
    });

