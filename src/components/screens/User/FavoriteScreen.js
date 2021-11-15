import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavorite, removeUserFavorite } from '../../../redux/actions';
import { thousand } from '../../../ultils/commonFunctions';
import HeaderCustom from '../../CustomComponents/HeaderCustom';

const FavoriteScreen = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const userFavoriteData = useSelector((state) => state.favorite);

    const isFocused = useIsFocused();

    useEffect(() => {
        dispatch(getUserFavorite());
        setData(userFavoriteData.data.response ? userFavoriteData.data.response.userCheckFavorite.favoritesData : null);
    }, [])

    const { navigate } = useNavigation();

    async function removeUserFav(itemId) {
        dispatch(removeUserFavorite(itemId));
        const filter = data.filter(item => item._id !== itemId)
        console.log('filterrrrrrrrrrrrrr', filter)
        setData(filter)
    }

    async function getUserFav(itemId) {
        dispatch(getUserFavorite());
    }

    useEffect(() => {
        dispatch(getUserFavorite());
        setData(userFavoriteData.data.response ? userFavoriteData.data.response.userCheckFavorite.favoritesData : data);
    }, [isFocused])

    useEffect(() => {
        dispatch(getUserFavorite());
        setData(userFavoriteData.data.response ? userFavoriteData.data.response.userCheckFavorite.favoritesData : data);
    }, [data])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(getUserFavorite());
        setData(userFavoriteData.data.response ? userFavoriteData.data.response.userCheckFavorite.favoritesData : data);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }

    const onPressCartItem = async (itemId) => {
        await removeUserFav(itemId);
        await onRefresh();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderCustom title={'Favorite'} />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="blue" />
                }
                data={data}
                keyExtractor={item => item._id}
                onEndReachedThreshold={.4}
                ListFooterComponent={<View style={{ height: 15 }} />}
                renderItem={({ item, index }) => (
                    <View style={{ ...styles.card, marginBottom: 5 }}>
                        <View style={{ width: '85%', height: '85%', flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.wrapper} onPress={() => navigate('FoodDetailsScreen', {
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
                }
            />
        </SafeAreaView>
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
