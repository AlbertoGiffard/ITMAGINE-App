import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, KeyboardAvoidingView, ActivityIndicator, Alert, Button, Pressable, ScrollView } from "react-native";
import { Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../../../estilos/globalStyle';
import { windowWidth, windowHeight } from "../../../../estilos/globalStyle";
import { DBService } from '../../../../services/DBService';
import { IPedido } from '../../../../definiciones/IPedido';
import { COLECCION_PEDIDOS } from '../../../../services/colecciones';
import { AppContext } from '../../../../context/AppContext';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ClienteEnMesa = (props: { route: { params: { pedido: any; }; }; }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [pedido, setPedido] = useState<IPedido | any>({});
    const [estadoPedido, setEstadoPedido] = useState('');
    const [cambio, setCambio] = useState(false);
    const [cambioEstado, setCambioEstado] = useState(false);
    const [escanear, setEscanear] = useState(false);
    const servicioPedido = new DBService<IPedido>(COLECCION_PEDIDOS);
    const context = useContext(AppContext);

    useEffect(() => {
        //version test
        const pedidoPrueba = {
            id: 25,
            cliente: {
                //email: 'junior.prueba@gmail.com',
                nombre: 'Henry',
                estado: 'en mesa'
            },
            numeroMesa: 8,
            productos: [
                {
                    producto: {
                        nombre: 'Milanesa con Pure',
                        descripcion: 'Pan con carne',
                        tiempoPromedio: 15,
                        precio: 400,
                        fotoUrlUno: null,
                        fotoUrlDos: null,
                        fotoUrlTres: null,
                        tipo: 'cocina'
                    },
                    cantidad: 2
                },
            ],
            estado: 'entregado', 
            total: 0
        }

        setPedido(pedidoPrueba);
        setEstadoPedido(pedidoPrueba.estado);//test
        
        //version prod
        if (context?.pedido) {
            //context.usuario.estado = 'en mesa';
            setPedido(context?.pedido);
        } else {
            setPedido(pedidoPrueba);
        }
        
        setCambio(!cambio);
    }, [])

    useEffect(() => {
        if (pedido.id != undefined) {
            servicioPedido.getPedido(pedido.id.toString(), (data: any) => {
                var estado = data.data().estado; //real
                //var estado = 'entregado'; //test

                setEstadoPedido(estado);

            }, (error: Error) => console.log('error', error))
        }
    }, [pedido])

    const enDesarrollo = () => {
        Alert.alert(
            'Lo Sentimos!',
            'Aún en desarrollo',
            [
                {
                    text: 'Entendido',
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
            }
        );
    }

    const pantallaEncuesta = () => {
        navigation.navigate('Carga', { siguientePantalla: 'Encuesta' });
    }

    const checkoutPedido = () => {
        if (estadoPedido == 'confirmado') {
            navigation.navigate('Carga', { siguientePantalla: 'CheckoutPedido' });            
        } else {
            Alert.alert(
                'Lo Sentimos!',
                'Aún no puede realizar el pago de su pedido',
                [
                    {
                        text: 'Entendido',
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                }
            );
        }
    }

    const escanearQR = (data: any) => {
        //aca debe ir la logica de escanear la mesa
        const tipo = JSON.parse(data.data).qr;
        const pedido = JSON.parse(data.data);

        if (pedido.qr == 'pedido') {
            if (pedido.estado == 'entregado') {
                pedido.estado = 'confirmado';
                setPedido(pedido);
                setEstadoPedido(pedido.estado);
                
                if (context != null) {
                    context.pedido = pedido;                    
                }
                servicioPedido.updateOne(pedido, pedido.id);
            } else {
                Alert.alert(
                    'Error',
                    'El pedido aun no está listo para confirmar',
                    [
                        {
                            text: 'Entendido',
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: true,
                    }
                );
            }
        } else {
            Alert.alert(
                'Error',
                'Debe escanear un pedido',
                [
                    {
                        text: 'Entendido',
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                }
            );
        }
        

        setEscanear(!escanear);
    }

    const renderizarQR = () => {
        //esta es la accion real
        setEscanear(!escanear);
        setCambio(!cambio);
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <View style={styles.formMarco}>
                <SafeAreaView style={styles.form}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View style={styles.vwImg}>
                            <Image source={require("../../../../assets/bar.png")} style={styles.Img}></Image>
                        </View>
                        <View style={styles.formTitle}>
                            <Text style={styles.textTitle}>
                                Estado de su pedido: <Text style={{ fontWeight: '400' }}>{estadoPedido}</Text>
                            </Text>
                        </View>
                        {estadoPedido == 'entregado' ?
                            <View>
                                {escanear ?
                                    <View style={styles.containerQR}>
                                        <View style={styles.containerCamara}>
                                            <BarCodeScanner
                                                onBarCodeScanned={escanearQR}
                                                style={styles.camara}
                                            />
                                        </View>
                                        <TouchableOpacity style={{ backgroundColor: PRIMARY_COLOR, borderRadius: 50, padding: 5, width: 50, paddingBottom: 5, paddingTop: 5 }} onPress={renderizarQR}>
                                            <Icon
                                                size={38}
                                                color={BG_COLOR}
                                                type={'ionicon'}
                                                name={'close-outline'}
                                                style={{ textAlign: 'center' }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                        <TouchableOpacity style={styles.button} onPress={renderizarQR}>
                                            <Icon
                                                size={38}
                                                color={SECONDARY_COLOR}
                                                type={'font-awesome'}
                                                name={'qrcode'}
                                            />
                                            <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18, textAlign: 'center' }}>Confirmar Pedido</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            : <View></View>
                        }
                        <View>
                            <TouchableOpacity style={styles.button} onPress={checkoutPedido}>
                                <Icon
                                    size={30}
                                    color={SECONDARY_COLOR}
                                    type={'ionicon'}
                                    name={'wallet'}
                                />
                                <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18, textAlign: 'center' }}>
                                    Pedir Cuenta
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={enDesarrollo}>
                                <Icon
                                    size={30}
                                    color={SECONDARY_COLOR}
                                    type={'font-awesome'}
                                    name={'gamepad'}
                                />
                                <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18, textAlign: 'center' }}>
                                    Juegos
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={pantallaEncuesta}>
                                <Icon
                                    size={30}
                                    color={SECONDARY_COLOR}
                                    type={'ionicon'}
                                    name={'trophy'}
                                />
                                <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18, textAlign: 'center' }}>
                                    Realizar Encuesta
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}

export default ClienteEnMesa

const styles = StyleSheet.create({
    scroll: {
        justifyContent: "center",
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "black"
    },
    containerQR: {
        alignItems: 'center',
    },
    containerCamara: {
        height: 400,
        marginBottom: 50,
        borderRadius: 5,
        borderColor: TERCIARY_COLOR,
        borderWidth: 2
    },
    camara: {
        width: 250,
        height: '100%'
    },
    formTitle: {
        padding: 2
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
        justifyContent: "center",
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
    input: {
        borderBottomColor:
            TERCIARY_COLOR,
        borderBottomWidth: 5,
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        width: windowWidth * 0.8,
        color: SECONDARY_COLOR
    },
    button: {
        borderColor: PRIMARY_COLOR,
        borderWidth: 3,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        padding: windowWidth * 0.05,
        width: windowWidth * 0.6,
        textAlign: 'center'

    },
    textTitle: {
        fontSize: windowHeight * 0.024,
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
        textAlign: 'center'
    },
    textSubtitle: {
        fontSize: windowHeight * 0.03,
        fontWeight: '500',
        color: SECONDARY_COLOR,
        textAlign: 'center'
    }
});

  //primarycolor: #fd99ef rosadito
  //secondary color: #3dd7fb azulito
  //terciary color: #ffe045 amarillo
  //bg color: #040104 negro de fondo