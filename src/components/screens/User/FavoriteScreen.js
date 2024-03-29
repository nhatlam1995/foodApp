import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../assets/strings';
import { getUserFavorite, removeUserFavorite } from '../../../redux/actions';
import { arrayIsEmpty, thousand } from '../../../ultils/commonFunctions';
import HeaderCustom from '../../CustomComponents/HeaderCustom';

const FavoriteScreen = () => {
    const { navigate, jumpTo } = useNavigation();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const favoriteData = useSelector(state => state.favorite);

    useEffect(() => {
        dispatch(getUserFavorite());
        setData(favoriteData.data)
    }, [])

    useEffect(() => {
        setData(favoriteData.data)
    }, [favoriteData])

    const onPressCartItem = (itemId) => {
        dispatch(removeUserFavorite(itemId));
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(getUserFavorite());
        setTimeout(() => {
            setRefreshing(false)
            setData(favoriteData.data)
        }, 2000);
    }

    const onPressFoodItem = (item) => {
        const found = data.some(i => i._id === item._id)
        navigate('FoodDetail', {
            id: item._id,
            url: item.url,
            weight: item.weight,
            price: item.price,
            name: item.name,
            nation: item.nation,
            status: item.status,
            description: item.description,
            isFav: found,
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderCustom title={'Favorite'} />
            {!arrayIsEmpty(data) ?
                <ScrollView
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '6%' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="blue" />
                    }
                >
                    {data.map((item, index) => {
                        return (
                            <View key={item._id} style={{ ...styles.card, marginBottom: 5 }}>
                                <View style={{ width: '85%', height: '85%', flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.wrapper} onPress={() => onPressFoodItem(item)}>
                                        <Image source={{ uri: item.url }} style={styles.image} />
                                    </TouchableOpacity>
                                    <View style={styles.desc}>
                                        <Text style={{ color: 'gray', fontSize: 12, fontStyle: 'italic' }}>{item.weight}</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{thousand(item.price)}VNĐ</Text>
                                        <Text numberOfLines={2} style={{ color: colors.accent, fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                                        <Text style={{ color: 'gray', fontSize: 12 }}>{item.nation}</Text>
                                        <TouchableOpacity onPress={() => onPressCartItem(item._id)}>
                                            <MaterialCommunityIcons name="heart" color={colors.accent} size={18} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: colors.accent }}>Your Favorite data is empty!</Text>
                    <MaterialCommunityIcons name="heart-outline" size={60} color={colors.accent} style={{ marginVertical: 15 }} />
                    <TouchableOpacity onPress={() => jumpTo('Home')} style={{
                        width: '35%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10
                    }}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']} style={{
                            width: '100%',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Let's started</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
        height: 80
    }
})
