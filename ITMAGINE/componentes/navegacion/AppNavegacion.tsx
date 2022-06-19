import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import PantallaSplash from '../pantallas/pantallaSplash/PantallaSplash';
import LoginScreen from '../pantallas/Login/Login';
import IngresoAnonimo from '../pantallas/IngresoAnonimo/IngresoAnonimo';
import HomeCliente from '../pantallas/HomeCliente/HomeCliente';
import ListadoPedido from '../pantallas/ListadoPedido/ListadoPedido';
import { Carga } from '../pantallas/PantallaCarga/Carga';
import ClienteEnMesa from '../pantallas/HomeCliente/ClienteEnMesa/ClienteEnMesa';
import CheckoutPedido from '../pantallas/CheckoutPedido/CheckoutPedido';
import PantallaRegistro from '../pantallas/Registro/Registro';
import { Encuesta } from '../pantallas/Encuesta/Encuesta';
import MenuProducto from '../pantallas/MenuProductos/MenuProductos';
import MenuMozo from '../pantallas/MenuMozo/MenuMozo';
import ListaEspera from '../pantallas/Listados/ListaEspera';
import HomeCocinero from '../pantallas/HomeBartender/HomeCocinero';
import HomeBartender from '../pantallas/HomeBartender/HomeBartender';
import ListadoCliente from '../pantallas/Listados/ListadoCliente';
import ListadoPedidos from '../pantallas/Listados/ListadoPedidos';
import PedidosMozo from '../pantallas/PedidosMozo/PedidosMozo';

const Stack = createNativeStackNavigator();

const AppNavegacion = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Splash'
                //screenOptions={{ headerShown: false, unmountOnBlur: true }}
                screenOptions={{ headerShown: false }}
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
                <Stack.Screen
                    name="Encuesta"
                    component={Encuesta}
                />
                <Stack.Screen
                    name="MenuProducto"
                    component={MenuProducto}
                />
                <Stack.Screen
                    name="MenuMozo"
                    component={MenuMozo}
                />
                <Stack.Screen
                    name="listaEspera"
                    component={ListaEspera}
                />
                <Stack.Screen
                    name="homeCocinero"
                    component={HomeCocinero}
                />
                <Stack.Screen
                    name="homeBartender"
                    component={HomeBartender}
                />
                <Stack.Screen
                    name="homeDuenio"
                    component={ListadoCliente}
                />
                <Stack.Screen
                    name='PedidosMozo'
                    component={PedidosMozo}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavegacion;