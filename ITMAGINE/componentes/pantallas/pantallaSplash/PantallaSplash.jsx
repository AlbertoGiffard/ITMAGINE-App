import React, { Component } from "react";
import { View, StatusBar, Text } from "react-native";
import * as Animatable from 'react-native-animatable';

export default class PantallaSplash extends Component {
    componentDidMount() {
        /* Esto queda comentado hasta que ya se cuente con la redireccion a la siguiente pagina */
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 3000, this) 
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#040104'}}>
                <Animatable.Text animation="fadeInDownBig" style={{ textAlign: 'center', marginTop: 10, fontSize: 30, color: '#3dd7fb' }}>
                    Alberto Giffard
                </Animatable.Text>
                <Animatable.Text animation="fadeInLeftBig" style={{ textAlign: 'center', marginTop: 10, fontSize: 30, color: '#3dd7fb' }}>
                    Leandro Varela
                </Animatable.Text>
                <Animatable.Text animation="fadeInRightBig" style={{ textAlign: 'center', marginTop: 10, fontSize: 30, color: '#3dd7fb' }}>
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
                <Animatable.Text animation="flipInY" iterationCount='infinite' style={{ textAlign: 'center', marginTop: 10, fontSize: 25, color: '#ffe045' }}>
                    4to B
                </Animatable.Text>
            </View>
        )
    }
}