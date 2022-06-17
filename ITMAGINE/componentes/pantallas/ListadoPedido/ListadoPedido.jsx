import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../../estilos/globalStyle';
import { windowWidth, windowHeight } from "../../../estilos/globalStyle";
import { DataTable } from 'react-native-paper';

const ListadoPedido = () => {
    const [pedido, setPedido] = useState({});
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();
    const [carga, setCarga] = useState(false);
    var totalVar = 0;


    useEffect(() => {
        //setPedido(props.route.params.pedido); //esta es la linea real        
        const pedidoPrueba = {
            id: 21,
            cliente: {
                email: 'junior.prueba@gmail.com',
                nombre: 'Junior',
            },
            numeroMesa: 8,
            productos: [
                {
                    producto: {
                        nombre: 'Hamburguesa',
                        descripcion: 'Pan con carne',
                        tiempoPromedio: 15,
                        precio: 150,
                        fotoUrlUno: null,
                        fotoUrlDos: null,
                        fotoUrlTres: null,
                        tipo: 'cocina'
                    },
                    cantidad: 2
                },
                {
                    producto: {
                        nombre: 'Cerveza',
                        descripcion: 'Corona',
                        tiempoPromedio: 5,
                        precio: 200,
                        fotoUrlUno: null,
                        fotoUrlDos: null,
                        fotoUrlTres: null,
                        tipo: 'bar'
                    },
                    cantidad: 3
                },
                {
                    producto: {
                        nombre: 'Entrada',
                        descripcion: 'Papas fritas',
                        tiempoPromedio: 15,
                        precio: 150,
                        fotoUrlUno: null,
                        fotoUrlDos: null,
                        fotoUrlTres: null,
                        tipo: 'cocina'
                    },
                    cantidad: 4
                },
            ],
            estado: 'pendiente',
            total: 0
        }

        setPedido(pedidoPrueba);
        return () => console.log('HEYY' + 'PUIT')
    }, []);

    const regresar = () => {
        //regresa al home
        //este navigate debe ir a Productos
        //navigation.navigate('HomeCliente', { pedido: pedido });
    }

    const confirmarPedido = () => {
        //confirma el pedido realizado
        var pedidoFinal = pedido;
        pedidoFinal.total = total;
        pedidoFinal.estado = 'por preparar';
        setPedido(pedidoFinal);
        //aca deberia actualizar en firebase
        navigation.navigate('HomeCliente', { pedido: pedido });
    }

    const eliminarPedido = (index) => {
        if (pedido.productos != undefined) {
            //setPedido(pedido.productos.filter((i) => { return i != index }));
            const aux = pedido;
            aux.productos.splice(index, 1);
            setPedido({...aux});
        }
    }

    const sumarTotal = (precio, cantidad) => {
        totalVar += (precio * cantidad);
        //setTotal(aux);
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <View style={styles.formMarco}>
                <SafeAreaView style={styles.form}>
                    <View style={styles.containerTable}>
                        <DataTable style={styles.dataTable}>
                            <DataTable.Header>
                                <DataTable.Title textStyle={styles.TitleTable}>Nombre</DataTable.Title>
                                <DataTable.Title textStyle={styles.TitleTable}>Cantidad</DataTable.Title>
                                <DataTable.Title textStyle={styles.TitleTable}>Precio u.</DataTable.Title>
                                <DataTable.Title textStyle={styles.TitleTable}>Subtotal</DataTable.Title>
                                <DataTable.Title textStyle={styles.TitleTable} numeric></DataTable.Title>
                            </DataTable.Header>

                            {pedido.productos != undefined && 
                                pedido.productos.map((itemPedido, index) => {
                                    { sumarTotal(itemPedido.producto.precio, itemPedido.cantidad) }
                                    return (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell textStyle={styles.cellTable}>{itemPedido.producto.nombre}</DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.cellTable} numeric>{itemPedido.cantidad}</DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.cellTable} numeric>${itemPedido.producto.precio}</DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.cellTable} numeric>${itemPedido.producto.precio * itemPedido.cantidad}</DataTable.Cell>
                                            <TouchableOpacity style={styles.containerEliminar} onPress={() => { eliminarPedido(index) }}>
                                                <DataTable.Cell textStyle={styles.cellTableEliminar} numeric>
                                                    eliminar
                                                </DataTable.Cell>
                                            </TouchableOpacity>
                                        </DataTable.Row>
                                    )
                                })
                            }

                            {pedido.productos == undefined &&
                                <DataTable.Row>
                                    <DataTable.Cell textStyle={styles.cellTable}>Aun sin productos...</DataTable.Cell>
                                </DataTable.Row>
                            }

                        </DataTable>
                    </View>
                    {/* //esta es linea divisoria */}
                    <View
                        style={{
                            borderBottomColor: PRIMARY_COLOR,
                            borderBottomWidth: 3,
                            alignSelf: 'stretch',
                            width: '95%',
                            textAlign: 'center',
                            justifyContent: 'center',
                            marginLeft: 10
                        }}
                    />
                    <View style={styles.containerTotal}>
                        <View style={styles.viewTotal}>
                            <Text style={styles.textTotal}>
                                TOTAL:
                            </Text>
                        </View>
                        <View style={styles.viewPrecioTotal}>
                            <Text style={styles.textTotal}>
                                ${totalVar}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.containerBotones}>
                        <View style={styles.viewBotonConfirmar}>
                            <TouchableOpacity style={styles.button} onPress={confirmarPedido}>
                                <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18 }}>Confirmar Pedido</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: PRIMARY_COLOR, borderRadius: 50, padding: 5, width: 50, paddingBottom: 5, paddingTop: 5 }}>
                            <Icon
                                size={38}
                                color={BG_COLOR}
                                type={'ionicon'}
                                name={'close-outline'}
                                style={{ textAlign: 'center' }}
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
}

export default ListadoPedido

const styles = StyleSheet.create({
    containerTable: {
        width: '100%',
        color: TERCIARY_COLOR,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "black"
    },
    formMarco: {
        marginHorizontal: 30,
        height: windowHeight,
        borderRadius: 40,
        width: windowWidth * 0.99,
        justifyContent: "center",
        alignItems: 'center',
        shadowColor: PRIMARY_COLOR,
        shadowOpacity: 1,
        elevation: 250,
        shadowOffset: { width: 0, height: 0 }
    },
    form: {
        marginHorizontal: 30,
        height: windowHeight * 0.90,
        borderRadius: 40,
        width: windowWidth * 0.95,
        //justifyContent: "center",
        alignItems: 'center',
        borderColor: SECONDARY_COLOR,
        borderWidth: 5,
        borderStyle: 'solid',
    },
    vwImg: {
        height: windowHeight * 0.2,
        borderRadius: 40,
        width: windowWidth * 0.8,
        marginBottom: 15
        //backgroundColor: 'blue'

    },
    Img: {
        maxHeight: "100%",
        maxWidth: "100%"
    },
    button: {
        borderColor: PRIMARY_COLOR,
        borderWidth: 3,
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: windowWidth * 0.8,

    },
    cellTable: {
        color: TERCIARY_COLOR,
        justifyContent: 'center',
        fontSize: windowHeight * 0.021,
        fontWeight: '500',
    },
    TitleTable: {
        fontSize: windowHeight * 0.021,
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
        textAlign: 'center'
    },
    dataTable: {
        padding: 10
    },
    cellTableEliminar: {
        color: 'red'
    },
    containerEliminar: {
        marginLeft: 15
    },
    containerTotal: {
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        width: '90%'
    },
    viewTotal: {
        width: '65%',
        borderRightColor: PRIMARY_COLOR,
        borderRightWidth: 2,
        color: TERCIARY_COLOR,
        marginRight: 5
    },
    viewPrecioTotal: {
        width: '35%',
        color: TERCIARY_COLOR
    },
    textTotal: {
        color: TERCIARY_COLOR,
        fontSize: windowHeight * 0.03,
        fontWeight: 'bold',
    },
    button: {
        borderColor: PRIMARY_COLOR,
        borderWidth: 3,
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: windowWidth * 0.8,

    },
    containerBotones: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    viewBotonRegresar: {
        width: '30%'
    },
    viewBotonConfirmar: {
        width: '90%',
        marginBottom: windowHeight * 0.08
    }
});

  //primarycolor: #fd99ef rosadito
  //secondary color: #3dd7fb azulito
  //terciary color: #ffe045 amarillo
  //bg color: #040104 negro de fondo