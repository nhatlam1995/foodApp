import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import MapView, { Marker } from "react-native-maps"
import HeaderCustom from '../../../CustomComponents/HeaderCustom'

const MapScreen = () => {
    const { goBack } = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderCustom left onPressLeft={() => goBack()} title="Map" />
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 10.787190,
                    longitude: 106.761940,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}>
                <Marker
                    coordinate={{
                        latitude: 10.787190,
                        longitude: 106.761940
                    }}
                    title="Your location"
                    description="Shipping address"
                />
                <Marker
                    coordinate={{
                        latitude: 10.788328,
                        longitude: 106.767753
                    }}
                    title="Our location"
                    description="9 9 1 5's Restaurant"
                />
            </MapView>
        </SafeAreaView>
    )
}

export default MapScreen

const styles = StyleSheet.create({})
