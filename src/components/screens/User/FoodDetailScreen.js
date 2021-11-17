import React, { useEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { addToCartAction, getUserFavorite, removeUserFavorite, setUserFavorite } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import HeaderCustom from '../../CustomComponents/HeaderCustom';
import { thousand } from '../../../ultils/commonFunctions';
import { showToast } from '../../CustomComponents/Toast';

const FoodDetailsScreen = ({ route }) => {
    const { id, url, weight, price, name, nation, status, description } = route.params;
    const [item, setItem] = useState()
    const userFavorite = useSelector((state) => state.favorite)

    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    const [flag, setFlag] = useState(false)

    const cartData = useSelector(state => state.cart);
    const quantity = cartData.reduce((quantity, item) => quantity + item.quantity, 0);

    useEffect(() => {
        setItem({ id, url, weight, price, name, nation, status, description })
    }, [route.params])

    useEffect(() => {
        setData(userFavorite.data.map(ele => ele._id));
    }, [userFavorite])

    useEffect(() => {
        if (data.includes(id)) {
            setFlag(true)
        }
        else
            setFlag(false)
    }, [data])

    useEffect(() => {
    }, [flag])

    const { goBack } = useNavigation();

    const onPressCart = () => {
        showToast(`You added ${quantity + 1} into cart`)
        const action = addToCartAction(item)
        dispatch(action)
    }

    const onPress = (itemId) => {
        if (flag === true) {
            dispatch(removeUserFavorite(itemId));
        }
        else {
            dispatch(setUserFavorite(itemId))
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={{ uri: url }} style={{ flex: 1 }} imageStyle={{ height: 350, resizeMode: 'stretch' }}>
                <HeaderCustom isLeftRight onPressLeft={() => goBack()} onPressCart={() => { onPressCart() }} onPressFavorite={() => {
                    onPress(id)
                }} flag={flag} name={name} />
                <View style={{ flex: 1.5 }} />
                <Animatable.View animation="fadeInUpBig" style={{ flex: 2, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white', alignItems: 'center' }}>
                    <View style={{ flex: 8, width: '94%', justifyContent: 'center' }}>
                        <ScrollView>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text numberOfLines={2} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#4dc2f8', marginVertical: 15 }}>{name}</Text>
                                    {status === 'NEW' ? <View style={{ backgroundColor: '#4dc2f8', width: 40, height: 20, borderRadius: 15, marginBottom: 15 }}><Text style={{ fontSize: 13, color: 'white', fontWeight: 'bold' }}>  New  </Text></View> : null}
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}><Text style={{ width: '24%', fontWeight: 'bold', fontSize: 16, color: '#4dc2f8' }}>Net weight</Text><Text style={{ fontStyle: 'italic', fontSize: 16 }}>{weight}</Text></View>
                                <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center', alignSelf: 'flex-start' }}><Text style={{ width: '24%', fontWeight: 'bold', fontSize: 16, color: '#4dc2f8' }}>Price</Text><Text style={{ fontSize: 16 }}>{thousand(price)}</Text></View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}><Text style={{ width: '24%', fontWeight: 'bold', fontSize: 16, color: '#4dc2f8' }}>Origin</Text><Text style={{ fontSize: 16 }}>{nation}</Text></View>
                                <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'flex-start', alignSelf: 'flex-start' }}><Text style={{ width: '24%', fontWeight: 'bold', fontSize: 16, color: '#4dc2f8' }}>Description</Text><Text style={{ width: '75%', fontSize: 16 }}>{description}</Text></View>
                            </View>
                        </ScrollView>
                    </View>
                    <TouchableOpacity onPress={() => onPressCart()} style={{ flex: 1, width: '94%', marginVertical: 15, }}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']} style={{ width: '100%', height: '100%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Add to cart</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ImageBackground>
        </View>
    )
}

export default FoodDetailsScreen

const styles = StyleSheet.create({})
