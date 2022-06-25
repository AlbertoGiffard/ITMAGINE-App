import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-elements';
import { AppContext } from '../../../context/AppContext';
import { ICliente } from '../../../definiciones/ICliente';
import { IMesa } from '../../../definiciones/IMesa';
import { BG_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, windowHeight, windowWidth } from '../../../estilos/globalStyle';
import { COLECCION_CLIENTES, COLECCION_COLA_ESPERA, COLECCION_MESAS } from '../../../services/colecciones';
import { DBService } from '../../../services/DBService';

const HomeCliente = (props: { route: { params: { usuario: any; pedido: any; }; }; }) => {
    const [usuario, setUsuario] = useState<ICliente | any>({ estado: '' });
    const [anonimo, setAnonimo] = useState(true);
    const [cambio, setCambio] = useState(false);
    const [pedido, setPedido] = useState({});
    const [hayPedido, setHayPedido] = useState(false);
    const [escanear, setEscanear] = useState(false);
    const [cambioEstado, setCambioEstado] = useState(false);
    const context = useContext(AppContext);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const servicioEspera = new DBService<IEspera>(COLECCION_COLA_ESPERA);
    const servicioMesa = new DBService<IMesa>(COLECCION_MESAS);
    const servicioCliente = new DBService<ICliente>(COLECCION_CLIENTES);

    useEffect(() => {
        if (context?.usuario) {
            setUsuario(context?.usuario);
        }

        if (context?.pedido) {
            setPedido(context?.pedido);
        }

        setCambio(!cambio);
    }, []);

    useEffect(() => {
        paraRenderizar();

    }, [cambio]);

    useEffect(() => {
        if (cambioEstado) {
            return servicioEspera.getListaEspera(usuario.nombre, (data: any) => {
                console.log('lista de espera: ', data.data());
                if (data.data().cliente.estado == 'en mesa') {
                    usuario.estado = 'en mesa';
                    setUsuario(usuario);
                    setCambio(!cambio);
                }
                if (data.data().cliente.estado == 'activo') {
                    usuario.estado = 'activo';
                    setUsuario(usuario);
                    setCambio(!cambio);
                }
                if (context?.usuario != null) {
                    context.usuario = usuario;
                    console.log('usuario: ', context.usuario);
                }
                


            }, (error: Error) => console.log('error', error))
        }
    }, [cambioEstado])


    const handleIngreso = (valor: any) => {
        const numero = valor.numero;
        const estado = valor.estadoAtencion;
        const tipo = valor.tipo;
        const nombreCliente = valor.nombreCliente; 
        console.log(context.pedido);
        console.log(usuario.nombre);
        console.log(nombreCliente);
        
         
        
        servicioMesa.getById(numero.toString()).then((mesa) => {
            if (mesa.estadoAtencion == 'ocupado' && nombreCliente == usuario.nombre) {
                if (context != null) {
                    if (context.pedido == null || context.pedido == undefined) {
                        navigation.navigate('Carga', { siguientePantalla: 'MenuProducto' });
                    } else {
                        navigation.navigate('Carga', { siguientePantalla: 'ClienteEnMesa' });
                    }
                }
            }
            else if (mesa.estadoAtencion == 'libre') {
                if (usuario.estado != 'en mesa') {
                    const mesa: IMesa = {
                        estadoAtencion: 'ocupado',
                        nombreCliente: usuario.nombre,
                        numero: numero,
                        tipo: tipo,
                        cantidadComensales: 1
                    }
    
                    usuario.estado = 'en mesa';
                    setUsuario(usuario);
                    //actualiza mesa y usuario en context
                    if (context != null) {
                        context.mesa = mesa;
                        context.usuario = usuario;
                    }
                    //si tiene email actualiza en fb
                    if (usuario.email) {
                        servicioCliente.updateOne(usuario, usuario.email);
                    } else {
                        servicioCliente.insertOne(usuario, usuario.nombre);
                    }
                    //redirige a la pagina de productos
                    servicioMesa.insertOne(mesa, mesa.numero.toString()).then(() => {
                        navigation.navigate('Carga', { siguientePantalla: 'MenuProducto' });
                    });
                } else {
                    Alert.alert(
                        'Error',
                        'Usted ya se encuentra asignado a una mesa',
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
                    'La mesa se encuentra ocupada',
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
        });



    }

    const cambiarAListaDeEspera = () => {
        usuario.estado = 'en espera';
        setUsuario(usuario);
        const fecha = new Date();

        const usuarioLista: IEspera = {
            cliente: usuario,
            horarioLlegada: fecha.getHours() + ':' + fecha.getMinutes()
        }

        //guardar usuario
        servicioEspera.insertOne(usuarioLista, usuario.nombre);
        setCambioEstado(true);
    }

    const escanearQR = (data: any) => {
        //aca debe ir la logica de escanear la mesa
        const valor = JSON.parse(data.data);
        console.log(valor)
        setEscanear(!escanear);
        
        switch (valor.qr) {
            case 'listaEspera':
                if (context?.pedido != null) {
                    //aca va la navegacion hasta el listado de encuestas
                    navigation.navigate('Carga', { siguientePantalla: 'Encuesta' });
                } else {
                    cambiarAListaDeEspera();
                }
                break;

            default:
                if (usuario.estado == 'inactivo') {
                    Alert.alert(
                        'Error',
                        'Debe primero colocarse en lista de espera',
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
                } else {
                    handleIngreso(valor);
                }
                break;
        }



    }

    const renderizarQR = () => {
        //esta es la accion real
        setEscanear(!escanear);
        setCambio(!cambio);
    }

    const paraRenderizar = () => {
        switch (usuario.estado) {
            case 'en espera':
                return (<View style={styles.formTitle}>
                    <Text style={styles.textTitle}>
                        Se encuentra en lista de espera
                    </Text>
                    <Text style={styles.textSubtitle}>
                        Aguarde por favor...
                    </Text>
                    <Animatable.View iterationCount='infinite' animation="rotate" style={{ marginTop: 10 }}>
                        <Icon
                            size={38}
                            color={SECONDARY_COLOR}
                            type={'font-awesome'}
                            name={'hourglass'}
                        />
                    </Animatable.View>
                </View>);
                break;

            case 'en mesa':
            case 'activo':
                return (
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
                            <TouchableOpacity style={styles.button} onPress={renderizarQR}>
                                <Icon
                                    size={38}
                                    color={SECONDARY_COLOR}
                                    type={'font-awesome'}
                                    name={'qrcode'}
                                />
                                <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18, textAlign: 'center' }}>Escanear mesa</Text>
                            </TouchableOpacity>
                        }

                    </View>
                );
                break;

            default:
                return (
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
                                        name={'hourglass-end'}
                                    />
                                    <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18, textAlign: 'center' }}>Colocarme en lista de espera</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                );
                break;
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <View style={styles.formMarco}>
                <SafeAreaView style={styles.form}>
                    <View style={styles.vwImg}>
                        <Image source={require("../../../assets/bar.png")} style={styles.Img}></Image>
                    </View>
                    {paraRenderizar()}
                </SafeAreaView>
            </View>
        </View>
    );
}

export default HomeCliente

const styles = StyleSheet.create({
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
        padding: 5,
        textAlign: 'center'
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
        fontSize: windowHeight * 0.04,
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