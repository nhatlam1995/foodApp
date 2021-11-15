import React from 'react'
import { ToastAndroid } from 'react-native'

export const showToast = (message) => {
    return (
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    )
};