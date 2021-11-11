import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Register = () => {
    const { navigate } = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <ScrollView>
                    <Text style={styles.textFooter}>Full name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color='#85c2ed' size={20} />
                        <TextInput placeholder="Please type Full Name" style={styles.textInput} onChangeText={setFullName} value={fullName} />
                    </View>

                    <Text style={{ ...styles.textFooter, marginTop: 25 }}>Email</Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons name="email-outline" color='#85c2ed' size={20} />
                        <TextInput placeholder="Please type Email" style={styles.textInput} onChangeText={(email) => validateEmail(email)} />
                        {validate === true ? <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View> : <Animatable.View animation="bounceIn">
                            <Feather name="x-circle" color="red" size={20} />
                        </Animatable.View>}
                    </View>

                    <Text style={{ ...styles.textFooter, marginTop: 25 }}>Phone Number</Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons name="cellphone" color='#85c2ed' size={20} />
                        <TextInput placeholder="Please type Phone Number" keyboardType="numeric" style={styles.textInput} onChangeText={setPhoneNumber} value={phoneNumber} />
                    </View>

                    <Text style={{ ...styles.textFooter, marginTop: 25 }}>Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color='#85c2ed' size={20} />
                        <TextInput placeholder="Please type password" secureTextEntry={secureEntry} style={styles.textInput} onChangeText={setPassword} value={password} />
                        <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                            {secureEntry ? <Feather name="eye-off" color="#85c2ed" size={20} /> : <Feather name="eye" color="#85c2ed" size={20} />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.textTerms}>
                        <Text style={styles.colorTerms}>
                            By signing up you agree to our
                        </Text>
                        <Text style={{ ...styles.colorTerms, fontWeight: 'bold' }}>
                            {" "}
                            Terms of Service
                        </Text>
                        <Text style={styles.colorTerms}>
                            {" "}
                            and
                        </Text>
                        <Text style={{ ...styles.colorTerms, fontWeight: 'bold' }}>
                            {" "}
                            Privacy Policy
                        </Text>
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => { }} style={styles.signIn}>
                            <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.signIn}>
                                <Text style={{ ...styles.textSign, color: 'white' }}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('LoginScreen')} style={{ ...styles.signIn, borderColor: '#4dc2f8', borderWidth: 1, marginTop: 15 }}>
                            <Text style={{ ...styles.textSign, color: '#4dc2f8' }}>Already have an account?</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View >
        </SafeAreaView >
    );
};

export default Register;

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
    },
    textTerms: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    colorTerms: {
        color: 'gray'
    }
})