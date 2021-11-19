import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { Avatar, Caption, Text, Title, TouchableRipple } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../../../assets/images';
import { getUserInfo, logOutAction, removeAllFromCartAction } from '../../../../redux/actions';
import HeaderCustom from '../../../CustomComponents/HeaderCustom';
import { colors } from '../../../../assets/strings'

const ProfileScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, [userData])

    const userData = useSelector((state) => state.user);

    console.log('User Data: ', userData)

    const { navigate } = useNavigation();
    const [isVisible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSubmit = () => {
        const actionLogOut = logOutAction();
        dispatch(actionLogOut);
        const actionClearCart = removeAllFromCartAction();
        dispatch(actionClearCart);
    }

    if (userData.data.response ? userData.data.response.loading : true) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <View style={{ width: '100%', height: '100%' }}>
                    <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.modalContainer}>
                        <View style={styles.modalWrapper}>
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} />
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Edit Profile</Text>
                            <TouchableOpacity onPress={() => setVisible(false)} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name="close-outline" color='white' size={20} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.modalButton}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Change avatar</Text>
                        </TouchableOpacity>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'white' }} />
                        <TouchableOpacity style={styles.modalButton}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Edit profile</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </BottomSheet>
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
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <Text style={{ ...styles.textMessage, fontWeight: 'bold' }}>Please contact: </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...styles.textMessage, fontWeight: 'bold' }}>Email: </Text><Text style={styles.textMessage}>nhatlam1695 @gmail.com</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...styles.textMessage, fontWeight: 'bold' }}>Mobile: </Text><Text style={styles.textMessage}>0389935371</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => toggleModal()} style={{ ...styles.buttonColor, borderColor: 'white', borderWidth: 1 }}>
                            <Text style={{ ...styles.textButton, color: 'white' }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </Modal>
            <HeaderCustom right title={"Profile"} />
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Avatar.Image
                            source={Images.default_avatar}
                            size={80}
                        />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5
                        }]}>
                            {userData.data.response ? userData.data.response.user.fullname : null}
                            <TouchableRipple onPress={() => { }}>
                                <AntDesign name="edit" size={20} color={colors.accent} />
                            </TouchableRipple>
                        </Title>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="map-marker-radius" color="#777777" size={20} />
                    <TouchableRipple onPress={() => { navigate("MapScreen") }} style={{ marginLeft: 20 }}>
                        <Text style={{ color: "#777777" }}>Hồ Chí Minh, Việt Nam</Text>
                    </TouchableRipple>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{userData.data.response ? userData.data.response.user.phonenumber : null}</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{userData.data.response ? userData.data.response.user.email : null}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <TouchableOpacity onPress={() => navigate("MemberScreen", { point: userData.data.response ? userData.data.response.user.memberPoints : null })} style={styles.infoBox}>
                    <Title>{userData.data.response ? userData.data.response.user.memberPoints : null}</Title>
                    <Caption>Points</Caption>
                </TouchableOpacity>
                <View style={{ borderRightColor: colors.accent, borderRightWidth: 1 }} />
                <TouchableOpacity onPress={() => navigate("HistoryScreen", { orders: userData.data.response ? userData.data.response.user.orderData.length : null })} style={styles.infoBox}>
                    <Title>{userData.data.response ? userData.data.response.user.orderData.length : null}</Title>
                    <Caption>Orders</Caption>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <MaterialCommunityIcons name="share-outline" color="#4dc2f8" size={25} />
                        <Text style={styles.menuItemText}>Tell Your Friends</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => toggleModal()}>
                    <View style={styles.menuItem}>
                        <MaterialCommunityIcons name="account-check-outline" color="#4dc2f8" size={25} />
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => navigate("SettingsScreen")}>
                    <View style={styles.menuItem}>
                        <Ionicons name="settings-outline" color="#4dc2f8" size={25} />
                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { handleSubmit() }}>
                    <View style={styles.menuItem}>
                        <Ionicons name="md-log-out-outline" color="#4dc2f8" size={25} />
                        <Text style={styles.menuItemText}>Log Out</Text>
                    </View>
                </TouchableRipple>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderColor: colors.accent,
        borderWidth: 1,
        flexDirection: 'row',
        height: 80,
        borderRadius: 40
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    textMessage: {
        color: 'white',
        fontSize: 18,
        marginVertical: 20
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonColor: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button: {
        width: '50%',
        alignItems: 'center'
    },
    modalButton: {
        width: '90%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center'
    },
    modalWrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
});