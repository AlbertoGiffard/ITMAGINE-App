import {Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image, ActivityIndicator, ImageBackground, FlatList, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../estilos/globalStyle';
import { Dialog } from 'react-native-elements';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const CardProducto = (props:any) => {

    const {producto, sumar, restar} = props
    const [cantidad, setCantidad] = useState(0)
    const [visible, setVisible] = useState(false)

    const SumarCard = () => {
        sumar(producto);
        setCantidad(cantidad + 1);
    }

    const RestarCard = () => {
        if(cantidad > 0){
            setCantidad(cantidad - 1);
            restar(producto);
        }

    }

    
    return (
        <View style={styles.container}>
          <Dialog isVisible={visible} onDismiss={() => setVisible(false)} overlayStyle={{backgroundColor: PRIMARY_COLOR, borderRadius: 25}}>
                    <Text style={styles.alertTitulo}>{producto.nombre}</Text>
                    <Text style={styles.alertDescripcion}>{producto.descripcion}</Text>
                <Dialog.Actions>
                <TouchableOpacity onPress={() => setVisible(false)}><Text style={{ fontSize: 15, fontWeight: "bold", backgroundColor: SECONDARY_COLOR, padding: 10, borderRadius: 25}}>Entendido!</Text></TouchableOpacity>
                </Dialog.Actions>
            </Dialog>
            <View style={styles.main}>
                <View style = {styles.vwTitulo}>
                    <Text style = {styles.titulo}>{producto.nombre}</Text>
                    <Text style = {styles.precio}>${producto.precio}</Text>
                </View>
                <View style = {styles.vwImg}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    snapToAlignment="start"
                    contentContainerStyle={{
                      paddingHorizontal: windowHeight * 0.001,
                    }}
                    snapToInterval={windowWidth * 0.9}
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    data={imagenes}
                    renderItem={({ item: imagen }) => {
                        return (
                          <View style={{ width: windowWidth * 0.9, backgroundColor: "green", justifyContent: "center", alignItems:"center" }}>
                              <Image source={require("../../assets/Productos/milanesa1.jpeg")} style={styles.img}></Image>
                          </View>
                        );
                    }}
                />
                </View>
                <View style = {styles.vwBotones}>
                    <TouchableOpacity style={styles.vwBotonInfo} onPress={() => {setVisible(true)}}>
                        <Image source={require('../../assets/info.png')} style={styles.imgBoton}></Image>
                    </TouchableOpacity>
                    <View style={{width:windowWidth * 0.4, height: windowHeight * 0.05, flexDirection: "row", justifyContent: "center", alignItems: 'center',}}>
                        <TouchableOpacity style={styles.vwBoton} onPress={RestarCard}>
                            <Image source={require('../../assets/menos.png')} style={styles.imgBoton}></Image>
                        </TouchableOpacity>
                        <Text style={{fontSize:25, color: SECONDARY_COLOR}}>{cantidad}</Text>
                        <TouchableOpacity style={styles.vwBoton} onPress={SumarCard}>
                            <Image source={require('../../assets/mas.png')} style={styles.imgBoton}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.vwReloj}>
                        <Text style = {styles.txtReloj}>{producto.tiempoPromedio}</Text>
                        <Image source={require("../../assets/reloj.png")} style={styles.imgReloj}></Image>
                    </View>
                </View>
            </View>
        </View>
    )

    //const Productos = [{nombre: "Milanesa con pure", descripcion: "Una milanesa flaco, que queres que te explique", tiempoPromedio: 15, precio: 400, tipo: "cocina"}]
                    //                    <View style={{width:windowWidth * 0.2, height: windowHeight * 0.05}}>

}

export default CardProducto;

const imagenes = [{id:1, path: "../../assets/Productos/milanesa1.jpeg"}, {id:2, path: "../../assets/Productos/milanesa2.jpeg"}, {id:3, path: "../../assets/Productos/milanesa3.jpeg"}]

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      width: windowWidth * 0.9,
      flexDirection: "row",
      borderRadius: 30,
      borderWidth: 5,
      borderColor: SECONDARY_COLOR,
    },
    main:{
        width: windowWidth * 0.9,
        justifyContent: "center",
        alignItems: 'center',
        margin: 5
    },
    vwTitulo:{
        justifyContent: "center",
        alignItems: 'center',
        height: windowHeight * 0.07,
        width: windowWidth * 0.9,
        flexDirection: "row",
        borderRadius: 30,
    },
        titulo:{
            height: windowHeight * 0.05,
            width: windowWidth * 0.65,
            fontSize: 20,
            paddingLeft: 20,
            color: PRIMARY_COLOR,
            textAlignVertical: "center",
        },
        precio:{
            height: windowHeight * 0.05,
            width: windowWidth * 0.15,
            fontSize: 25,
            color: TERCIARY_COLOR,
            textAlignVertical: "center",
        },
        vwReloj:{
            justifyContent: "center",
            alignItems: 'center',
            height: windowHeight * 0.05,
            width: windowWidth * 0.25,
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
    vwImg:{
        justifyContent: "center",
        alignItems: 'center',
        height: windowHeight * 0.2,
        width: windowWidth * 0.87,
    },
        img:{
            maxHeight: "100%",
            maxWidth: "100%",
        },
    vwBotones:{
        width: windowWidth * 0.90,
        height: windowHeight * 0.05,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
    },
        vwBoton:{
            width: windowWidth * 0.20,
            height: windowHeight * 0.05,
            alignItems: 'center',
        },
        imgBoton:{
            maxHeight: "95%",
            maxWidth: "100%",
            resizeMode: "contain",
        },
        vwBotonInfo:{
            width: windowWidth * 0.25,
            height: windowHeight * 0.05,
            justifyContent: "center",
            alignItems: 'center',
            paddingLeft: windowWidth * 0.05
        },
    alertTitulo:{
        color: BG_COLOR,
        height: windowHeight * 0.04,
        fontSize: 20,
        fontWeight: "bold"
    },
    alertDescripcion:{
        color: BG_COLOR,
        fontSize: 18
    }
})

