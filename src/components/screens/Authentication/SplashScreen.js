import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Images } from '../../../assets/images'

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen").width;

const SplashScreen = () => {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View styles={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={Images.logo}
                    style={styles.logo}
                    resizeMode={"stretch"}
                />
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.title}>Stay connect with everyone</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.signIn}>
                            <Text style={styles.textSign}>Get started</Text>
                            <MaterialIcons name="navigate-next" color="white" size={20} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#85c2ed'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: height * 0.7 * 0.4,
        height: height * 0.7 * 0.4
    },
    title: {
        color: '#85c2ed',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text: {
        color: 'gray',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    }

})
