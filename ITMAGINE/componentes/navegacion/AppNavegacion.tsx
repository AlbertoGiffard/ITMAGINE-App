import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { Chat } from '../pantallas/Chat/Chat';

import CheckoutPedido from '../pantallas/CheckoutPedido/CheckoutPedido';
import { Encuesta } from '../pantallas/Encuesta/Encuesta';
import { GraficoEncuestas } from '../pantallas/GraficosEncuestas/GraficosEncuestas';
import HomeBartender from '../pantallas/HomeBartender/HomeBartender';
import HomeCocinero from '../pantallas/HomeBartender/HomeCocinero';
import ClienteEnMesa from '../pantallas/HomeCliente/ClienteEnMesa/ClienteEnMesa';
import HomeCliente from '../pantallas/HomeCliente/HomeCliente';
import IngresoAnonimo from '../pantallas/IngresoAnonimo/IngresoAnonimo';
import ListadoPedido from '../pantallas/ListadoPedido/ListadoPedido';
import ListadoCliente from '../pantallas/Listados/ListadoCliente';
import ListaEspera from '../pantallas/Listados/ListaEspera';
import LoginScreen from '../pantallas/Login/Login';
import MenuMozo from '../pantallas/MenuMozo/MenuMozo';
import MenuProducto from '../pantallas/MenuProductos/MenuProductos';
import { Carga } from '../pantallas/PantallaCarga/Carga';
import PantallaSplash from '../pantallas/pantallaSplash/PantallaSplash';
import PedidosMozo from '../pantallas/PedidosMozo/PedidosMozo';
import PantallaRegistro from '../pantallas/Registro/Registro';

const Stack = createNativeStackNavigator();

const AppNavegacion = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='HomeCliente'
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
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                />
                <Stack.Screen
                    name='GraficoEncuestas'
                    component={GraficoEncuestas}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavegacion;