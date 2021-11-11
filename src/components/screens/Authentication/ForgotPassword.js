import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const { navigate } = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('admin');
    const [validate, setValidate] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);

    const dispatch = useDispatch();

    const handleSubmit = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.textFooter}>Your registered email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color='#85c2ed' size={20} />
                    <TextInput placeholder="Please type email" style={styles.textInput} onChangeText={(email) => validateEmail(email)} />
                    {validate === true ?
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View> : null}
                </View>
                <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                    <Text style={{ color: '#009bd1', marginTop: 15 }}>Back to sign in</Text>
                </TouchableOpacity>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => handleSubmit()} style={styles.signIn}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.signIn}>
                            <Text style={{ ...styles.textSign, color: 'white' }}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View >
        </SafeAreaView >
    );
};

export default ForgotPassword;

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