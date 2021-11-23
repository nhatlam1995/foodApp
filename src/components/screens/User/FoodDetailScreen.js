import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AirbnbRating, Rating } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../assets/strings';
import { addToCartAction, removeUserFavorite, setUserFavorite } from '../../../redux/actions';
import { thousand } from '../../../ultils/commonFunctions';
import HeaderCustom from '../../CustomComponents/HeaderCustom';
import TabView from '../../CustomComponents/TabView';
import { showToast } from '../../CustomComponents/Toast';

const FoodDetailsScreen = ({ route }, props) => {
    const { id, url, weight, price, name, nation, status, description, isFav } = route.params;

    const [isSelectedTab, setIsSelectedTab] = useState(1)
    const [listTab, setListTab] = useState([
        {
            id: "1",
            title: "Detail",
            isSelected: true
        },
        {
            id: "2",
            title: "Rating",
            isSelected: false
        },
    ])

    const onPressTab = (id) => {
        let list = listTab.map((item) => {
            if (item.id == id) {
                return Object.assign({}, item, { isSelected: true })
            } else {
                return Object.assign({}, item, { isSelected: false })
            }
        })
        setListTab(list)
        setIsSelectedTab(id)
    }

    const [item, setItem] = useState()
    const userFavorite = useSelector((state) => state.favorite)

    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    const [flag, setFlag] = useState(false);
    const [fav, setFav] = useState(false);

    const cartData = useSelector(state => state.cart);
    const quantity = cartData.reduce((quantity, item) => quantity + item.quantity, 0);

    useEffect(() => {
        setItem({ id, url, weight, price, name, nation, status, description })
        setFlag(isFav)
    }, [route.params])

    useEffect(() => {
    }, [flag])

    const { goBack } = useNavigation();

    const onPressCart = () => {
        showToast(`You added ${quantity + 1} into cart`)
        const action = addToCartAction(item)
        dispatch(action)
    }

    const onPress = (itemId) => {
        setFlag(!flag)
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
                <Animatable.View animation="fadeInUpBig" style={styles.infoContainer}>
                    <TabView {...props} listTab={listTab} onPressTab={(id) => onPressTab(id)} />
                    {isSelectedTab == 1 &&
                        <View style={{ flex: 2, width: '94%', alignItems: 'center' }}>
                            <ScrollView showsVerticalScrollIndicator={false} >
                                <View style={styles.alignCenter}>
                                    <View style={{ ...styles.alignCenter, width: '90%', }}>
                                        <Text numberOfLines={2} style={styles.textFoodName}>{name}</Text>
                                        {status === 'NEW' ? <View style={styles.status}><Text style={{ fontSize: 13, color: 'white', fontWeight: 'bold' }}>  New  </Text></View> : null}
                                    </View>
                                    <View style={styles.rowTextTitle}>
                                        <View style={{ width: '30%' }}>
                                            <Text style={styles.textInfo}>Net weight</Text>
                                        </View>
                                        <View style={{ width: '70%' }}>
                                            <Text style={{ fontStyle: 'italic', fontSize: 16 }}>{weight}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rowText}>
                                        <View style={{ width: '30%' }}>
                                            <Text style={styles.textInfo}>Price</Text>
                                        </View>
                                        <View style={{ width: '70%' }}>
                                            <Text style={{ fontSize: 16 }}>{thousand(price)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rowTextTitle}>
                                        <View style={{ width: '30%' }}>
                                            <Text style={styles.textInfo}>Origin</Text>
                                        </View>
                                        <View style={{ width: '70%' }}>
                                            <Text style={{ fontSize: 16 }}>{nation}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rowDescription}>
                                        <View style={{ width: '30%' }}>
                                            <Text style={styles.textInfo}>Description</Text>
                                        </View>
                                        <View style={{ width: '70%' }}>
                                            <Text style={{ width: '100%', fontSize: 16 }}>{description}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => onPressCart()} style={{ height: 80, width: '94%', marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.addToCartButton}>
                                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Add to cart</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    }
                    {isSelectedTab == 2 &&
                        <View style={{ flex: 8, width: '94%', justifyContent: 'flex-start' }}>
                            <AirbnbRating count={5} reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]} defaultRating={3} size={15} />
                            <View style={styles.rowDescription}>
                                <View style={{ width: '30%' }}>
                                    <Text style={styles.textInfo} numberOfLines={1}>Username: </Text>
                                    <Rating type='star' ratingCount={5} imageSize={15} style={{ paddingVertical: 5, alignSelf: 'flex-start' }} readonly startingValue={4.5} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ width: '100%', fontSize: 16 }}>Comment CommentCommentCommentComment</Text>
                                </View>
                            </View>
                            <View style={styles.rowDescription}>
                                <View style={{ width: '30%' }}>
                                    <Text style={styles.textInfo} numberOfLines={1}>Username: </Text>
                                    <Rating type='star' ratingCount={5} imageSize={15} style={{ paddingVertical: 5, alignSelf: 'flex-start' }} readonly startingValue={2} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ width: '100%', fontSize: 16 }}>Comment CommentCommentCommentComment</Text>
                                </View>
                            </View>
                        </View>
                    }
                </Animatable.View>
            </ImageBackground>
        </View >
    )
}

export default FoodDetailsScreen

const styles = StyleSheet.create({
    infoContainer: {
        flex: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    alignCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textFoodName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.accent
    },
    status: {
        backgroundColor: colors.accent,
        width: 40,
        height: 20,
        borderRadius: 15,
        marginVertical: 5
    },
    rowTextTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    rowText: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    rowDescription: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-start',
    },
    textInfo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.accent
    },
    addToCartButton: {
        width: '90%',
        height: '70%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})