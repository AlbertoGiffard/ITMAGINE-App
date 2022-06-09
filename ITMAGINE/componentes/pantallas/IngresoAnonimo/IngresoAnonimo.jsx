import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, KeyboardAvoidingView, ActivityIndicator, Alert } from "react-native";
import { Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../../estilos/globalStyle';
import { windowWidth, windowHeight } from "../../../estilos/globalStyle";

const IngresoAnonimo = () => {
    const [nombre, setNombre] = useState('');
    const navigation = useNavigation();

    const handleIngreso = () => {
        //setLoading(true);
        if (nombre == '') {
            showAlert();
        } else {
            const usuarioAnonimo = {
                nombre: nombre,
                estado: 'inactivo'
            };
            navigation.navigate('HomeCliente', { usuario: usuarioAnonimo });
        }
    }

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Debe indicar un nombre válido',
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


    return (
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <View style={styles.formMarco}>
                <SafeAreaView style={styles.form}>
                    <View style={styles.vwImg}>
                        <Image source={require("../../../assets/bar.png")} style={styles.Img}></Image>
                    </View>
                    <View style={styles.formTitle}>
                        <Text style={styles.textTitle}>
                            Bienvenido a ITMAGINE
                        </Text>
                        <Text style={styles.textSubtitle}>
                            Indícanos tu nombre para colocarte en la lista de espera.
                        </Text>
                    </View>
                    <View style={styles.vwLogin}>
                        <Input
                            inputContainerStyle={styles.input}
                            inputStyle={{ color: SECONDARY_COLOR }}
                            //style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor={"#3dd7fc"}
                            leftIcon={
                                <Icon
                                    size={20}
                                    color={SECONDARY_COLOR}
                                    type={'ionicon'}
                                    name={'person-outline'}
                                />}
                            value={nombre}
                            onChangeText={(text) => { setNombre(text) }}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleIngreso}>
                        <Text style={{ fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18 }}> Ingresar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
    );
}

export default IngresoAnonimo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "black"
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
    vwLogin: {
        height: windowHeight * 0.3,
        width: windowWidth * 0.8,
        marginTop: windowHeight * 0.05,
        //backgroundColor: 'green'

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
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: windowWidth * 0.8,

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