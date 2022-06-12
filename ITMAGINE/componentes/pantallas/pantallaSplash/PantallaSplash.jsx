import React, { Component } from "react";
import { View, StatusBar, Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import { BG_COLOR, TERCIARY_COLOR, SECONDARY_COLOR } from "../../../estilos/globalStyle";

export default class PantallaSplash extends Component {
    componentDidMount() {
        setTimeout(() => {
            //this.props.navigation.navigate('Login'); //real
            this.props.navigation.navigate('ListadoPedido'); //test
        }, 3000, this) 
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: BG_COLOR}}>
                <Animatable.Text animation="fadeInDownBig" style={{ textAlign: 'center', marginTop: 10, fontSize: 30, color: SECONDARY_COLOR }}>
                    Alberto Giffard
                </Animatable.Text>
                <Animatable.Text animation="fadeInLeftBig" style={{ textAlign: 'center', marginTop: 10, fontSize: 30, color: SECONDARY_COLOR }}>
                    Leandro Varela
                </Animatable.Text>
                <Animatable.Text animation="fadeInRightBig" style={{ textAlign: 'center', marginTop: 10, fontSize: 30, color: SECONDARY_COLOR }}>
                    Agustin Clas
                </Animatable.Text>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
                <Animatable.Image
                    animation='pulse'
                    easing='ease-out'
                    iterationCount='infinite'
                    style={{
                        width: 350,
                        height: 350,
                        margin: 100
                    }}
                    source={require('../../../assets/splash.png')}
                />
                <Animatable.Text animation="flipInY" iterationCount='infinite' style={{ textAlign: 'center', marginTop: 10, fontSize: 25, color: TERCIARY_COLOR }}>
                    4to B
                </Animatable.Text>
            </View>
        )
    }
}