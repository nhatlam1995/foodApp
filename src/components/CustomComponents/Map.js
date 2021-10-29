import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from "react-native-maps"

const MapCheck = () => {
    const { goBack } = useNavigation();
    return (
        <View style={{ flex: 1 }}>
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
        </View>
    )
}

export default MapCheck

const styles = StyleSheet.create({
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -.5
    },
    name: {
        fontSize: 16,
        marginBottom: 5
    },
    img: {
        width: 120,
        height: 80
    }
})
