import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, KeyboardAvoidingView, ActivityIndicator, Alert, Button, Pressable } from "react-native";
import { Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../../../estilos/globalStyle';
import { windowWidth, windowHeight } from "../../../../estilos/globalStyle";

const ClienteEnMesa = (props: { route: { params: { pedido: any; }; }; }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [estadoPedido, setEstadoPedido] = useState('En preparación');

    useEffect(() => {
        if (props.route.params?.pedido != undefined) {
            if (props.route.params?.pedido) {
                setEstadoPedido(props.route.params?.pedido.estado);                
            }
        }
    }, [])
    

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
        //se debe desarrollar
        //navigation.navigate('pantalla de encuesta', {pedido: props.route.params?.pedido});
    }

    const checkoutPedido = () => {
        navigation.navigate('CheckoutPedido', {pedido: props.route.params?.pedido});
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <View style={styles.formMarco}>
                <SafeAreaView style={styles.form}>
                    <View style={styles.vwImg}>
                        <Image source={require("../../../../assets/bar.png")} style={styles.Img}></Image>
                    </View>
                    <View style={styles.formTitle}>
                        <Text style={styles.textTitle}>
                            Estado de su pedido: <Text style={{fontWeight:'400'}}>{estadoPedido}</Text> 
                        </Text>
                    </View>
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
                </SafeAreaView>
            </View>
        </View>
    );
}

export default ClienteEnMesa

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