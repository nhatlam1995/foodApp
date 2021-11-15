import React, { useState } from 'react'
import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { showToast } from './Toast'
import { TextInput } from 'react-native-paper'
import { Images } from '../../assets/images'
import { colors } from '../../assets/strings'

const HeaderCustom = (props) => {
    const [search, setSearch] = useState(false);

    return (
        <View style={styles.rootContainer} >
            <View style={styles.gradient}>
                {props.isLeftRight &&
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={props.onPressLeft}>
                            <Image source={Images.ic_back} style={styles.img} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.text}>{props.title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ ...styles.button, marginHorizontal: 5 }} onPress={() => {
                                props.onPressFavorite()
                                props.flag === false ? showToast('You liked this food') : showToast('You unliked this food')
                            }}>
                                {props.flag === false ? <MaterialCommunityIcons name="heart-outline" color='#4dc2f8' size={18} /> : <MaterialCommunityIcons name="heart" color='#4dc2f8' size={18} />}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                showToast('Added into cart!')
                                props.onPressCart()
                            }}>
                                <MaterialCommunityIcons name="cart-outline" color='#4dc2f8' size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {props.left &&
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={props.onPressLeft}>
                            <Image source={Images.ic_back} style={styles.img} />
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.text}>{props.title}</Text>
                        </View>
                        <View style={styles.noButton} />
                    </View>
                }
                {props.right &&
                    <View style={styles.container}>
                        <View style={styles.noButton} />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.text}>{props.title}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={props.onPressRight}>
                            <Image source={Images.ic_notification} style={styles.imgNoti} />
                        </TouchableOpacity>
                    </View>
                }
                {!props.right && !props.left && !props.isLeftRight && !props.isSearch && props.title &&
                    <View style={styles.container}>
                        <View style={styles.noButton} />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.text}>{props.title}</Text>
                        </View>
                        <View style={styles.noButton} />
                    </View>
                }
                {props.isSearch && props.title &&
                    <View style={styles.container}>
                        {search ?
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '75%' }}>
                                <View style={styles.button}>
                                    <Ionicons name="search-outline" color='#4dc2f8' size={18} />
                                </View>
                                <TextInput placeholder="Search here" style={{ marginLeft: 10, height: 30, width: '100%', backgroundColor: 'white', }}>

                                </TextInput>
                                <TouchableOpacity onPress={() => setSearch(false)}>
                                    <Ionicons name="close-outline" color='#4dc2f8' size={18} />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setSearch(true)
                                props.onPressSearch
                            }} >
                                <Ionicons name="search-outline" color='#4dc2f8' size={18} />
                            </TouchableOpacity>}
                        {!search ? <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.text}>{props.title}</Text>
                        </View> : null}
                        <TouchableOpacity style={styles.button} onPress={() => {
                            props.onPressNotification
                        }}>
                            <Image source={Images.ic_notification} style={styles.imgNoti} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View >
    )
}

export default HeaderCustom

const styles = StyleSheet.create({
    rootContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: colors.accent,
        borderBottomWidth: 1
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '94%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4dc2f8',
        borderWidth: 1
    },
    leftRightButton: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4dc2f8',
        borderWidth: 1
    },
    noButton: {
        width: 30,
        height: 30,
    },
    img: {
        width: 6.67,
        height: 13.33,
        resizeMode: 'contain',
        tintColor: '#4dc2f8'
    },
    imgNoti: {
        width: '50%',
        height: '100%',
        resizeMode: 'contain',
        tintColor: '#4dc2f8'
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'Roboto',
        color: '#4dc2f8'
    }
})