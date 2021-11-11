import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAction } from '../../../redux/actions'
import { dataHome } from '../../../redux/FakeData'
import { thousand } from '../../../ultils/commonFunctions'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cartItem)

    const onClick = (id) => {
        setCategoryID(id)
        if (selectedId === id)
            setSelectedID(id)
        else
            setSelectedID(id)
    }

    const { navigate } = useNavigation();

    const [categoryID, setCategoryID] = useState(0);

    const [selectedId, setSelectedID] = useState(0);

    console.log(data)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <View style={{ flex: 1, marginVertical: 10 }}>
                    <FlatList
                        horizontal
                        data={dataHome}
                        extraData={selectedId}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => {
                                onClick(index)
                                console.log(index)
                            }} key={item.moduleID.toString()} style={{ width: 90, height: 30, backgroundColor: index === selectedId ? '#4dc2f8' : 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginHorizontal: 5, marginVertical: 5 }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{item.moduleName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{ flex: 15 }}>
                    <FlatList
                        data={dataHome[categoryID].moduleData}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingHorizontal: 25, }}
                        renderItem={({ item, index }) => (
                            <View style={{ width: '45%' }}>
                                <TouchableOpacity
                                    style={{ flex: 1, marginVertical: 10, borderWidth: 1, borderColor: '#4dc2f8', borderRadius: 10 }}
                                    key={index}
                                >
                                    <View style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', borderRadius: 10 }}>
                                        <View style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', borderRadius: 10, marginHorizontal: 15, paddingVertical: 5 }}>
                                            <View style={{ height: '60%', alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ width: 110, height: 110 }}>
                                                    <Image source={{ uri: item.url }} style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 5 }} />
                                                </View>
                                            </View>
                                            <View style={{ width: '80%', height: '40%', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <Text style={{ color: 'gray', fontSize: 12, fontStyle: 'italic' }}>{item.weight}</Text>
                                                <Text style={{ fontWeight: 'bold' }}>{thousand(item.price)}VNĐ</Text>
                                                <Text numberOfLines={1} style={{ color: '#4dc2f8', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                                                <Text style={{ color: 'gray', fontSize: 12 }}>{item.nation}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity >
                                <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        dispatch(addToCartAction(item))
                                    }} style={{ height: 30, width: 110, backgroundColor: '#4dc2f8', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 15 }}>Add to cart</Text></TouchableOpacity>
                                </View>
                                <View style={{ marginLeft: 15, borderWidth: .5, marginTop: 10, borderColor: '#4dc2f8' }} />
                            </View>
                        )}
                    />
                </View> */}
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
