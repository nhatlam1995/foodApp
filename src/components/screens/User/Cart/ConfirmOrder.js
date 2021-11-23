import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderCustom from '../../../CustomComponents/HeaderCustom'

const ConfirmOrder = ({ route }) => {
    const { goBack } = useNavigation();
    return (
        <View>
            <HeaderCustom left onPressLeft={() => goBack()} title={'ConfirmOrder'} />
            <Text>ConfirmOrder</Text>
        </View>
    )
}

export default ConfirmOrder

const styles = StyleSheet.create({})
