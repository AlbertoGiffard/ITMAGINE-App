import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-elements';
import { BG_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, windowHeight, windowWidth } from '../../../estilos/globalStyle';

const HomeCliente = (props: { route: { params: { usuario: any; pedido: any; }; }; }) => {
    const [usuario, setUsuario] = useState({ estado: '' });
    const [anonimo, setAnonimo] = useState(true);
    const [cambio, setCambio] = useState(false);
    const [pedido, setPedido] = useState({});
    const [hayPedido, setHayPedido] = useState(false);
    const [escanear, setEscanear] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        if (props.route.params.usuario) {
            setUsuario(props.route.params.usuario);
            //estas lineas no van, son de prueba
            usuario.estado = 'inactivo';
            setUsuario(usuario);
            //            
        }

        if (props.route.params.pedido) {
            setHayPedido(true);
            setPedido(props.route.params.pedido);
            usuario.estado = 'en mesa';
            setUsuario(usuario);
        }

        setCambio(!cambio);
    }, []);

    useEffect(() => {
        paraRenderizar();
        //console.log(usuario);
    }, [cambio]);

    const handleIngreso = () => {
        //setLoading(true);
    }

    const cambiarAListaDeEspera = () => {
        usuario.estado = 'en espera';
        setUsuario(usuario);
        const objCarga = {siguientePantalla: 'ListadoPedido', parametrosParaSiguientePantalla: {} as never};
        navigation.navigate('Carga', objCarga);
        //navigation.navigate('ListadoPedido', objCarga);
        //actualizar en FB
        /* const firestore = new DBService<ICliente>(COLECCION_CLIENTES);
        firestore.insertOne(usuario, usuario.email).catch((error) => {
                console.log('error: ', error);
                
            });     */       


        setCambio(!cambio);
    }

    const escanearQR = (data: any) => {
        //aca debe ir la logica de escanear la mesa
        console.log(data);
    }

    const renderizarQR = () => {
        //esta es la accion real
        setEscanear(!escanear);

        //esto es por ahora para probar
        //navigation.navigate('ListadoPedido');
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
                        <TouchableOpacity style={styles.button} onPress={cambiarAListaDeEspera}>
                            <Icon
                                size={38}
                                color={SECONDARY_COLOR}
                                type={'font-awesome'}
                                name={'hourglass-end'}
                            />
                            <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18, textAlign: 'center' }}>Colocarme en lista de espera</Text>
                        </TouchableOpacity>
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