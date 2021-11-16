import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavorite, removeUserFavorite } from '../../../redux/actions';
import { arrayIsEmpty, thousand } from '../../../ultils/commonFunctions';
import HeaderCustom from '../../CustomComponents/HeaderCustom';

const FavoriteScreen = () => {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    const favoriteData = useSelector(state => state.favorite);

    useEffect(() => {
        setData(favoriteData.data)
    }, [])

    useEffect(() => {
        setData(favoriteData.data)
    }, [favoriteData])

    const onPressCartItem = (itemId) => {
        dispatch(removeUserFavorite(itemId));
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderCustom title={'Favorite'} />
            {!arrayIsEmpty(data) ?
                <ScrollView
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    // ref={props.reff}
                    // style={props.horizontal ? { paddingVertical: '3%' } : { marginBottom: 30 }}
                    contentContainerStyle={
                        {
                            paddingBottom: '6%',
                        }}
                >
                    {data.map((item, index) => {
                        return (
                            <View key={item._id} style={{ ...styles.card, marginBottom: 5 }}>
                                <View style={{ width: '85%', height: '85%', flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.wrapper} onPress={() => navigate('FoodDetail', {
                                        id: item._id,
                                        url: item.url,
                                        weight: item.weight,
                                        price: item.price,
                                        name: item.name,
                                        nation: item.nation,
                                        status: item.status,
                                        description: item.description
                                    })}>
                                        <Image source={{ uri: item.url }} style={styles.image} />
                                    </TouchableOpacity>
                                    <View style={styles.desc}>
                                        <Text style={{ color: 'gray', fontSize: 12, fontStyle: 'italic' }}>{item.weight}</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{thousand(item.price)}VNĐ</Text>
                                        <Text numberOfLines={2} style={{ color: '#4dc2f8', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                                        <Text style={{ color: 'gray', fontSize: 12 }}>{item.nation}</Text>
                                        <TouchableOpacity onPress={() => onPressCartItem(item._id)}>
                                            <Text>Xoóa</Text>
                                        </TouchableOpacity>
                                        <MaterialCommunityIcons name="heart" color='#4dc2f8' size={18} />
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
                :
                <View>
                    <Text>Empty Favorite</Text>
                </View>
            }
        </View>
    )
}

export default FavoriteScreen

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
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 80,
    },
})
