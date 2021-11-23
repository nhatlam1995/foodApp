import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { thousand } from '../../../../ultils/commonFunctions'
import HeaderCustom from '../../../CustomComponents/HeaderCustom'
import moment from 'moment';

const HistoryScreen = ({ route }) => {
    const { orders } = route.params
    const [data, setData] = useState(null)

    useEffect(() => {
        setData(orders)
    }, [orders])

    console.log(data)

    const { goBack, navigate } = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderCustom left onPressLeft={() => goBack()} title={'History'} />
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                onEndReachedThreshold={.4}
                ListFooterComponent={<View style={{ height: 15 }} />}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigate("OrderDetailScreen", { id: index, total: item.total, quantity: data[index].orderDetail.length, data: data[index] })}>
                        <View style={{ width: '90%', height: '85%', justifyContent: 'center' }}>
                            <View style={{ height: '90%', justifyContent: 'space-around' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4dc2f8' }}>Order ID: </Text>
                                    </View>
                                    <Text style={{ fontStyle: 'italic' }}>{item._id}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4dc2f8' }}>Order Time: </Text>
                                    </View>
                                    <Text>{moment(item.createdAt).format('llll')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4dc2f8' }}>Products: </Text>
                                    </View>
                                    <Text>{item.orderDetail.length}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4dc2f8' }}>Total: </Text>
                                    </View>
                                    <Text>{thousand(item.total)}</Text>
                                </View>
                            </View>
                        </View >
                    </TouchableOpacity >
                )
                }
            />
        </View >
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
    card: {
        width: '94%',
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        marginBottom: 5,
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
    }
})
