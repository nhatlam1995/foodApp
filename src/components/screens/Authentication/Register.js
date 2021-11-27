import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ActivityIndicator, BackHandler, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../assets/strings'
import { signUp, signUpNavigate } from '../../../redux/actions';
import { useBackHandler } from '@react-native-community/hooks'

const Register = () => {
    const registerData = useSelector(state => state.register)
    const dispatch = useDispatch();

    const { push } = useNavigation();
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBackButtonClick = () => {
        push('LoginScreen');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

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

    const onPressRegister = () => {
        setLoading(true)
        if (fullname == '' || email == '' || phonenumber == '' || password == '') {
            setModalVisible(true);
            setModalMessage('Please fill information');
            setLoading(false);
        }
        else if (phonenumber.toString().length < 10 || phonenumber.toString().length > 10) {
            setModalVisible(true);
            setModalMessage('Phone Number must have 10 numbers');
            setLoading(false);

        }
        else {
            if (validate) {
                dispatch(signUp(email, phonenumber, password, fullname))
                setLoading(true);
            }
            else {
                setModalVisible(true);
                setModalMessage('Wrong email format');
                setLoading(false);
            }
        }
    }

    const toggleModal = () => {
        setModalVisible(false)
    };

    useEffect(() => {
        if (registerData.message === null) {
        }
        else if (registerData.error) {
            setLoading(false);
            setModalVisible(true);
            setModalMessage(registerData.message);
        }
        else if (!registerData.error) {
            setLoading(false);
            setModalVisible(true);
            setModalMessage(registerData.message);
            push('LoginScreen')
        }
    }, [registerData])

    console.log('aaaaaaaaa', registerData)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
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
                    <View style={styles.buttonModal}>
                        <TouchableOpacity onPress={() => toggleModal()} style={{ ...styles.buttonColor, borderColor: 'white', borderWidth: 1 }}>
                            <Text style={{ ...styles.textButton, color: 'white' }}>I Got It</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </Modal>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <ScrollView>
                    <Text style={styles.textFooter}>Full name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color='#85c2ed' size={20} />
                        <TextInput placeholder="Please type Full Name" style={styles.textInput} onChangeText={setFullName} value={fullname} />
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
                        <TextInput placeholder="Please type Phone Number" keyboardType="numeric" style={styles.textInput} onChangeText={setPhoneNumber} value={phonenumber} />
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
                        <TouchableOpacity onPress={() => onPressRegister()} style={styles.signIn}>
                            <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.signIn}>
                                <Text style={{ ...styles.textSign, color: 'white' }}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => push('LoginScreen')} style={{ ...styles.signIn, borderColor: colors.accent, borderWidth: 1, marginTop: 15 }}>
                            <Text style={{ ...styles.textSign, color: colors.accent }}>Already have an account?</Text>
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
    },
    buttonModal: {
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