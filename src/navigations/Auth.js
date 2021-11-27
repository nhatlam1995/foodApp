import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
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
    const auth = useSelector((state) => state.login);
    const [token, setToken] = useState(null)
    const [isRemember, setIsRemember] = useState(false)

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const getData = async () => {
        try {
            setToken(await AsyncStorage.getItem('token'))
            setIsRemember(await AsyncStorage.getItem('isRemember'))
        } catch (error) {
            console.log('Get Async Storage error', error)
        }
    }

    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    };

    useEffect(() => {
        getData()
        if (auth.error) {
            setLoading(false)
            setModalVisible(true)
            setModalMessage(auth.data.response.message)
        }
    }, [auth])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {isRemember == 'true' ? <MyTabs /> : auth.isLoggedIn === true ? <MyTabs /> : <AuthStack />}
            </View>
            <Modal
                testID={'modal'}
                backdropColor="#B4B3DB"
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                isVisible={isModalVisible}
                onBackdropPress={toggleModal} >
                <LinearGradient colors={['#5db8fe', '#39cff2']} style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 30 }}>
                    <Feather name="alert-triangle" size={35} color='yellow' />
                    <Text style={styles.textMessage}>{modalMessage}</Text>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => toggleModal()} style={{ ...styles.buttonColor, borderColor: 'white', borderWidth: 1 }}>
                            <Text style={{ ...styles.textButton, color: 'white' }}>I Got It</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </Modal>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    button: {
        width: '50%',
        alignItems: 'center'
    },
    buttonColor: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textMessage: {
        color: 'white',
        fontSize: 18,
        marginVertical: 20
    }
})