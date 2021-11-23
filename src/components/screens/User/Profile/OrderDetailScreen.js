import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { thousand } from '../../../../ultils/commonFunctions';
import HeaderCustom from '../../../CustomComponents/HeaderCustom';

const OrderDetailScreen = ({ route }) => {
    const { id, total, quantity, data } = route.params;
    console.log(data)
    const { goBack } = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderCustom left onPressLeft={() => goBack()} title={'History Order'} />
            <FlatList
                data={data.orderDetail}
                keyExtractor={item => item._id}
                onEndReachedThreshold={.4}
                ListFooterComponent={<View style={{ height: 15 }} />}
                renderItem={({ item, index }) => (
                    <View style={{ ...styles.card, marginBottom: 5 }}>
                        <View style={{ width: '90%', height: '90%', flexDirection: 'row' }}>
                            <View style={styles.wrapper}>
                                <Image source={{ uri: item.url }} style={styles.image} />
                            </View>
                            <View style={styles.desc}>
                                <Text style={{ color: 'gray', fontSize: 12, fontStyle: 'italic' }}>{item.weight}</Text>
                                <Text style={{ fontWeight: 'bold' }}>{thousand(item.price)}VNĐ</Text>
                                <Text numberOfLines={2} style={{ color: '#4dc2f8', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                                <Text style={{ color: 'gray', fontSize: 12 }}>{item.nation}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontSize: 15 }}>Quantity: </Text>
                                        <Text style={{ textAlign: 'center', marginHorizontal: 10, width: 30, borderBottomWidth: 1, fontWeight: 'bold', fontSize: 15 }}>{item.quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#4dc2f8', fontWeight: 'bold', fontSize: 15 }}>Total: </Text>
                                        <Text style={{ color: '#4dc2f8', fontWeight: 'bold', fontSize: 15 }}>{thousand(item.price * item.quantity)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
            <View style={{ justifyContent: 'center', height: 120, alignItems: 'center' }}>
                <LinearGradient colors={['#5db8fe', '#39cff2']} style={{
                    width: '94%', height: '80%', borderColor: '#4dc2f8', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10
                }}>
                    <View style={{ width: '50%', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, textDecorationLine: 'underline' }}>Products:</Text>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>{quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, textDecorationLine: 'underline' }}>Total:</Text>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>{thousand(total)}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
    card: {
        width: '94%',
        alignSelf: 'center',
        marginTop: 20,
        height: 140,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    wrapper: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        borderRadius: 10
    },
    desc: {
        width: '65%',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Roboto',
        color: 'black',
        fontSize: 14
    },
    qty: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: 'gray'
    },
    subTitle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: 'gray'
    },
    headerSm: {
        fontFamily: 'Roboto',
        color: 'black',
        fontSize: 14
    },
})
