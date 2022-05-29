import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import PantallaSplash from '@pantallas/pantallaSplash/PantallaSplash';

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavegacion;