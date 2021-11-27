import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../../redux/actions';
import { colors } from '../../../assets/strings'

const Login = () => {
    const { navigate, push } = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('admin');
    const [validate, setValidate] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.login);
    const [isSelected, setIsSelected] = useState(false);

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('isRemember', `${isSelected}`)
        } catch (error) {
            console.log('Async Storage set remember error ', error)
        }
    }

    const onChange = () => setIsSelected(!isSelected);

    const dispatch = useDispatch();

    console.log('Login Reducers: ', auth)

    const handleSubmit = () => {
        dispatch(loginAction(email, password))
        storeData()
        setLoading(true)
    }

    useEffect(() => {
        if (auth.error)
            setLoading(false)
    }, [auth])

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmail(text)
            setValidate(false)
            return false;
        }
        else {
            setEmail(text)
            setValidate(true)
            return true;
        }
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.textFooter}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color='#85c2ed' size={20} />
                    <TextInput placeholder="Please type your email" style={styles.textInput} onChangeText={(email) => validateEmail(email)} />
                    {validate === true ?
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View> : null}
                </View>

                <Text style={{ ...styles.textFooter, marginTop: 25 }}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color='#85c2ed' size={20} />
                    <TextInput placeholder="Please type password" secureTextEntry={secureEntry} style={styles.textInput} onChangeText={setPassword} value={password} />
                    <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                        {secureEntry ? <Feather name="eye-off" color="#85c2ed" size={20} /> : <Feather name="eye" color="#85c2ed" size={20} />}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        checked={isSelected}
                        onPress={() => onChange()}
                        size={20}
                        center
                        title='Remember me'
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                        textStyle={{ color: "#4dc2f8" }}
                        uncheckedColor={{ color: "#4dc2f8" }}
                    />
                </View>
                <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                    <Text style={{ color: '#009bd1', marginTop: 15 }}>Forgot password</Text>
                </TouchableOpacity>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => handleSubmit()} style={styles.signIn}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.signIn}>
                            <Text style={{ ...styles.textSign, color: 'white' }}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('RegisterScreen')} style={{ ...styles.signIn, borderColor: colors.accent, borderWidth: 1, marginTop: 15 }}>
                        <Text style={{ ...styles.textSign, color: colors.accent }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View >
        </SafeAreaView >
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#85c2ed'
    },
    header: {
        flex: 0.5,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    textFooter: {
        color: '#85c2ed',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#85c2ed'
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})