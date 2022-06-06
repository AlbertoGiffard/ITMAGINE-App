import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, KeyboardAvoidingView, ActivityIndicator, Alert } from "react-native";
import { Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

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
                            inputStyle={{ color: "#3dd7fb" }}
                            //style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor={"#3dd7fc"}
                            leftIcon={
                                <Icon
                                    size={20}
                                    color={"#3dd7fb"}
                                    type={'ionicon'}
                                    name={'person-outline'}
                                />}
                            value={nombre}
                            onChangeText={(text) => { setNombre(text) }}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleIngreso}>
                        <Text style={{ fontWeight: 'bold', color: '#3dd7fb', fontSize: 18 }}> Ingresar</Text>
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
    vwLogin: {
        height: windowHeight * 0.3,
        width: windowWidth * 0.8,
        marginTop: windowHeight * 0.05,
        //backgroundColor: 'green'

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