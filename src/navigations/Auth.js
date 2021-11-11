import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from "react-native";
import ForgotPassword from "../components/screens/Authentication/ForgotPassword";
import Login from "../components/screens/Authentication/Login";
import Register from "../components/screens/Authentication/Register";
import SplashScreen from "../components/screens/Authentication/SplashScreen";
import WelcomeScreen from "../components/screens/Authentication/WelcomeScreen";
import MyTabs from "./index";


const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen} />
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen} />
            <Stack.Screen
                name="LoginScreen"
                component={Login} />
            <Stack.Screen
                name="RegisterScreen"
                component={Register} />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword} />
        </Stack.Navigator>
    )
}

export default function Auth() {
    const [isLoggedIn, setisLoggedIn] = useState(true);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {isLoggedIn ? <MyTabs /> : <AuthStack />}
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({

})