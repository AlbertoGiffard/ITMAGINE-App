import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import PantallaSplash from '@pantallas/pantallaSplash/PantallaSplash';
import LoginScreen from '@pantallas/Login/Login';
import IngresoAnonimo from '@pantallas/IngresoAnonimo/IngresoAnonimo';
import HomeCliente from '@pantallas/HomeCliente/HomeCliente';
import ListadoPedido from '@pantallas/ListadoPedido/ListadoPedido';
import { Carga } from '../pantallas/PantallaCarga/Carga';

const Stack = createNativeStackNavigator();

const AppNavegacion = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Splash'
                navigationOptions={{ headerShown: false }}
                screenOptions={{ headerShown: false }}
                options={{ headerShown: false }}
            >
                <Stack.Screen
                    name='Splash'
                    component={PantallaSplash}
                    navigationOptions={{ headerShown: false }}
                    screenOptions={{ headerShown: false }}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Carga'
                    component={Carga}
                    navigationOptions={{ headerShown: false }}
                    screenOptions={{ headerShown: false }}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    navigationOptions={{ headerShown: false }}
                    screenOptions={{ headerShown: false }}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='IngresoAnonimo'
                    component={IngresoAnonimo}
                    navigationOptions={{ headerShown: false }}
                    screenOptions={{ headerShown: false }}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='HomeCliente'
                    component={HomeCliente}
                    navigationOptions={{ headerShown: false }}
                    screenOptions={{ headerShown: false }}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='ListadoPedido'
                    component={ListadoPedido}
                    navigationOptions={{ headerShown: false }}
                    screenOptions={{ headerShown: false }}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavegacion;