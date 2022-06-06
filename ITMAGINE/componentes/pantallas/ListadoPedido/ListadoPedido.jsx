import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, KeyboardAvoidingView, ActivityIndicator, Alert } from "react-native";
import { Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Table, TableWrapper, Row, Rows, Cell } from 'react-native-table-component';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const ListadoPedido = () => {
    const navigation = useNavigation();
    const cabeceraTabla = ['Nombre', 'Cantidad', 'Precio', 'Total'];
    const [dataTabla, setDataTabla] = useState([
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd']
    ]);

    const regresar = () => {
        //regresa al home
        //navigation.navigate('HomeCliente', { usuario: usuarioAnonimo });
    }

    const confirmarPedido = () => {
        //confirma el pedido realizado
    }

    const element = (data, index) => (
        <TouchableOpacity onPress={() => { console.log(index); }}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <View style={styles.formMarco}>
                <SafeAreaView style={styles.form}>
                    {/* <View style={styles.vwImg}>
                        <Image source={require("../../../assets/bar.png")} style={styles.Img}></Image>
                    </View> */}
                    <View >
                        <Table>
                            <Row data={cabeceraTabla}  style={styles.head}/>
                            <Rows data={dataTabla}/>
                        </Table>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
}

export default ListadoPedido

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#ffe045' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#ffe045' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    containerTable: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "black",
        height: 200,
        width: 200,
        backgroundColor: '#ffe045'
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