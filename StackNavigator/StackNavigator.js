import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppProvider } from '../Components/GlobalVariables';
import IntroScreen from '../Screens/IntroScreen';
import ExchangeScreen from '../Screens/ExchangeScreen';
import { NavigationContainer } from '@react-navigation/native';

const stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <AppProvider>
            <NavigationContainer>
                <stack.Navigator initialRouteName='IntroScreen' screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                    animationDuration: 200
                }}
                >
                    <stack.Screen name='IntroScreen' component={IntroScreen} />
                    <stack.Screen name='ExchangeScreen' component={ExchangeScreen} />
                </stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    )
}
