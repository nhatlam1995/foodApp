import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import HeaderCustom from '../../../CustomComponents/HeaderCustom';

const SettingsScreen = () => {
    const { goBack } = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <Animatable.View animation="fadeInLeft" style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderCustom left onPressLeft={() => goBack()} title={'Settings'} />
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
                <View>
                    <Text>US</Text>
                </View>
            </Modal>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {isEnabled ?
                        <MaterialCommunityIcons name="bell-outline" size={25} color="#4dc2f8" />
                        :
                        <MaterialCommunityIcons name="bell-off-outline" size={25} color="#4dc2f8" />
                    }
                    <Text style={{ marginLeft: 5, fontSize: 16 }}>Notification</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <MaterialIcons name="language" size={25} color="#4dc2f8" />
                    <TouchableOpacity onPress={() => { toggleModal() }}>
                        <Text style={{ marginLeft: 5, fontSize: 16 }}>Change language</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="information-outline" size={25} color="#4dc2f8" />
                    <Text style={{ marginLeft: 5, fontSize: 16 }}>App version: 1.0.0</Text>
                </View>
            </View>
        </Animatable.View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '94%',
        marginVertical: 15,
        alignSelf: 'center'
    }
})
