import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import PantallaSplash from '@pantallas/pantallaSplash/PantallaSplash';
import LoginScreen from '@pantallas/Login/Login';
import IngresoAnonimo from '@pantallas/IngresoAnonimo/IngresoAnonimo';
import HomeCliente from '@pantallas/HomeCliente/HomeCliente';
import ListadoPedido from '@pantallas/ListadoPedido/ListadoPedido';
import { Carga } from '@pantallas/PantallaCarga/Carga';
import ClienteEnMesa from '@pantallas/HomeCliente/ClienteEnMesa/ClienteEnMesa';
import CheckoutPedido from '@pantallas/CheckoutPedido/CheckoutPedido';
import PantallaRegistro from '@pantallas/Registro/Registro';

const Stack = createNativeStackNavigator();

const AppNavegacion = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Splash'
                screenOptions={{ headerShown: false, unmountOnBlur: true }}
            >
                <Stack.Screen
                    name='Splash'
                    component={PantallaSplash}
                />
                <Stack.Screen
                    name='Carga'
                    component={Carga}
                />
                <Stack.Screen
                    name='Registro'
                    component={PantallaRegistro}
                />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                />
                <Stack.Screen
                    name='IngresoAnonimo'
                    component={IngresoAnonimo}
                />
                <Stack.Screen
                    name='HomeCliente'
                    component={HomeCliente}
                />
                <Stack.Screen
                    name='ListadoPedido'
                    component={ListadoPedido}
                />
                <Stack.Screen
                    name='ClienteEnMesa'
                    component={ClienteEnMesa}
                />
                <Stack.Screen
                    name='CheckoutPedido'
                    component={CheckoutPedido}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavegacion;