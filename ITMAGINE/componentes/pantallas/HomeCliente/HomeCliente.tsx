import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, KeyboardAvoidingView, ActivityIndicator, Alert, Button, Pressable } from "react-native";
import { Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const HomeCliente = (props: { route: { params: { usuario: any; }; }; }) => {
    const [usuario, setUsuario] = useState({ estado: '' });
    const [anonimo, setAnonimo] = useState(true);
    const [cambio, setCambio] = useState(false);
    const [escanear, setEscanear] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        setUsuario(props.route.params.usuario);
        setCambio(!cambio);
    }, []);

    useEffect(() => {
        paraRenderizar();
        console.log(usuario);
    }, [cambio]);

    const handleIngreso = () => {
        //setLoading(true);
    }

    const cambiarAListaDeEspera = () => {
        usuario.estado = 'en espera';
        setUsuario(usuario);
        setCambio(!cambio);
    }

    const escanearQR = (data: any) => {
        //aca debe ir la logica de escanear la mesa
        console.log(data);
    }

    const renderizarQR = () => {
        //esta es la accion real
        //setEscanear(!escanear);

        //esto es por ahora para probar
        navigation.navigate('ListadoPedido');
    }

    const paraRenderizar = () => {
        usuario.estado = 'en mesa';
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
                            color={"#3dd7fb"}
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
                                <TouchableOpacity style={{ backgroundColor: '#fd99ef', borderRadius: 50, padding: 5, width: 50, paddingBottom: 5, paddingTop: 5 }} onPress={renderizarQR}>
                                    <Icon
                                        size={38}
                                        color={"#040104"}
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
                                    color={"#3dd7fb"}
                                    type={'font-awesome'}
                                    name={'qrcode'}
                                />
                                <Text style={{ fontWeight: 'bold', color: '#3dd7fb', fontSize: 18, textAlign: 'center' }}>Escanear mesa</Text>
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
                                color={"#3dd7fb"}
                                type={'font-awesome'}
                                name={'hourglass-end'}
                            />
                            <Text style={{ fontWeight: 'bold', color: '#3dd7fb', fontSize: 18, textAlign: 'center' }}>Colocarme en lista de espera</Text>
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
        borderColor: '#ffe045',
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
        shadowColor: "#fd99ef",
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
        borderColor: '#3dd7fb',
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
            "#ffe045",
        borderBottomWidth: 5,
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        width: windowWidth * 0.8,
        color: "#3dd7fb"
    },
    button: {
        borderColor: '#fd99ef',
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
        color: "#3dd7fb",
        textAlign: 'center'
    },
    textSubtitle: {
        fontSize: windowHeight * 0.03,
        fontWeight: '500',
        color: "#3dd7fb",
        textAlign: 'center'
    }
});

  //primarycolor: #fd99ef rosadito
  //secondary color: #3dd7fb azulito
  //terciary color: #ffe045 amarillo
  //bg color: #040104 negro de fondo