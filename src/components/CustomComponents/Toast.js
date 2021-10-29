import React from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'

export const showToast = (message) => {
    return (
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    )
};

const styles = StyleSheet.create({})