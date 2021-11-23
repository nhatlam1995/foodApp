import { useIsFocused, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SwipeableFlatList, SwipeableQuickActionButton, SwipeableQuickActions } from 'react-native-swipe-list'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../../../assets/strings'
import { addOrder, addToCartAction, getUserInfo, removeFromCartAction, removeItemFromCartAction } from '../../../../redux/actions'
import { arrayIsEmpty, thousand } from '../../../../ultils/commonFunctions'
import HeaderCustom from '../../../CustomComponents/HeaderCustom'

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const CartScreen = () => {
    const data = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const total = data.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const quantity = data.reduce((quantity, item) => quantity + item.quantity, 0);
    const orderData = useSelector(state => state.order)
    const [dataSend, setDataSend] = useState(null);

    const { jumpTo, navigate } = useNavigation();

    const [flag, setFlag] = useState(false);

    const onPressCartItem = (item) => {
        const action = removeFromCartAction(item)
        dispatch(action)
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        setDataSend(Object.assign({ total: total, points: total / 1000, orderDetail: data }))
    }, [isFocused])

    useEffect(() => {
        setDataSend(Object.assign({ total: total, points: total / 1000, orderDetail: data }))
    }, [flag])

    const onClickCheckOut = () => {
        console.log('orderDetail', data)
        console.log('total + point', total, total / 1000)
        dispatch(addOrder(dataSend))
        dispatch(getUserInfo())
        if (orderData.data.response.message === "Success") {
            navigate("ConfirmOrder")
        }
    }

    console.log('ooooooooooooo', orderData)

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderCustom right title={'Cart'} />
            {!arrayIsEmpty(data) ?
                <View style={{ flex: 1 }}>
                    <SwipeableFlatList
                        data={data}
                        keyExtractor={item => item.id}
                        onEndReachedThreshold={.4}
                        renderRightActions={({ item }) => (
                            <SwipeableQuickActions style={styles.swipeDeleteContainer}>
                                <SwipeableQuickActionButton onPress={() => onPressCartItem(item)}
                                    text="Remove" textStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
                                    style={{ width: '100%', height: '100%' }} />
                            </SwipeableQuickActions>
                        )}
                        ListFooterComponent={<View style={{ height: 15 }} />}
                        renderItem={({ item, index }) => (
                            <View style={{ ...styles.card, marginBottom: 5 }}>
                                <View style={{ width: '90%', height: '90%', flexDirection: 'row' }}>
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
                                        <Text numberOfLines={2} style={{ color: colors.accent, fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                                        <Text style={{ color: 'gray', fontSize: 12 }}>{item.nation}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                {item.quantity === 1 ? <TouchableOpacity onPress={() => {
                                                    setFlag(!flag)
                                                    onPressCartItem(item)
                                                }} style={styles.decreaseButton}>
                                                    <MaterialCommunityIcons size={18} name="cart-remove" color="white" />
                                                </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={() => {
                                                        dispatch(removeItemFromCartAction(item))
                                                        setFlag(!flag)
                                                    }} style={styles.decreaseButton}>
                                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, bottom: 1 }}>-</Text>
                                                    </TouchableOpacity>
                                                }
                                                <Text style={{ textAlign: 'center', marginHorizontal: 10, width: 30, borderBottomWidth: 1, fontWeight: 'bold', fontSize: 15 }}>{item.quantity}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    dispatch(addToCartAction(item))
                                                    setFlag(!flag)
                                                }} style={styles.decreaseButton}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.totalTextItem}>Total: </Text>
                                                <Text style={styles.totalTextItem}>{thousand(item.price * item.quantity)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: colors.accent }}>Your cart is empty!</Text>
                    <MaterialCommunityIcons name="cart-arrow-down" size={60} color={colors.accent} style={{ marginVertical: 15 }} />
                    <TouchableOpacity onPress={() => jumpTo('Home')} style={styles.jumpToHomeButton}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.shopButton}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Shop now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            }
            {quantity !== 0 &&
                <View style={{ justifyContent: 'center', height: 130, alignItems: 'center' }}>
                    <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.checkOutContainer}>
                        <View style={{ width: '70%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.rowText}>
                                    <Text style={styles.textUnderline}>Products: </Text>
                                    <Text style={styles.textNormal}>{quantity}</Text>
                                </View>
                                <View style={styles.rowText}>
                                    <Text style={styles.textUnderline}>Point: </Text>
                                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>{thousand(total / 1000)}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { onClickCheckOut() }} style={styles.checkOutButton}>
                            <Text style={styles.textTotal}>Total: {thousand(total)}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            }

        </View >
    )
}

export default CartScreen

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
    swipeDeleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginRight: 15,
        marginTop: 20,
        borderRadius: 15,
        backgroundColor: colors.accent,
        height: 140,
        alignSelf: 'center'
    },
    decreaseButton: {
        width: 23,
        height: 23,
        borderRadius: 5,
        backgroundColor: colors.accent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalTextItem: {
        color: colors.accent,
        fontWeight: 'bold',
        fontSize: 15
    },
    shopButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    jumpToHomeButton: {
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    checkOutContainer: {
        width: '94%',
        height: '80%',
        borderColor: colors.accent,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10
    },
    checkOutButton: {
        width: '70%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    rowText: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center'
    },
    textUnderline: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    textNormal: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    textTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.accent
    }
})