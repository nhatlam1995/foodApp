import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Badge } from 'react-native-elements/dist/badge/Badge'
import { useDispatch, useSelector } from 'react-redux'
import { sizes, colors, fonts } from '../../../assets/strings'
import { getCategory, getUserFavorite, getUserInfo } from '../../../redux/actions'
import { categoryData } from '../../../redux/FakeData'
import { thousand } from '../../../ultils/commonFunctions'
import HeaderCustom from '../../CustomComponents/HeaderCustom'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [favData, setFavData] = useState([]);

    const homeData = useSelector((state) => state.home);
    const userFavorite = useSelector((state) => state.favorite)

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getUserFavorite());
        dispatch(getUserInfo());
    }, [])

    useEffect(() => {
        setFavData(userFavorite.data.map(ele => ele._id));
    }, [userFavorite])

    console.log('homeData', homeData);

    const [selectedId, setSelectedID] = useState(0);

    const onClick = (id) => {
        if (selectedId === id)
            setSelectedID(id)
        else
            setSelectedID(id)
    }

    function renderHeader() {
        const renderHeaderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        onClick(index)
                    }}
                    key={item._id}
                    style={{
                        ...styles.headerContainer,
                        backgroundColor: index === selectedId ? colors.accent : colors.white,
                    }}>
                    <View style={styles.headerWrapper}>
                        <Image source={item.icon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 16, color: index === selectedId ? colors.white : colors.accent }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ flexDirection: 'row', height: 130, alignItems: 'center' }}>
                <FlatList
                    horizontal
                    data={categoryData}
                    extraData={selectedId}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderHeaderItem}
                />
            </View>
        )
    }

    function renderFoodList() {
        const { navigate } = useNavigation();

        const [refreshing, setRefreshing] = useState(false);

        const onRefresh = () => {
            setRefreshing(true);
            dispatch(getUserFavorite());
            setTimeout(() => {
                setRefreshing(false)
            }, 2000);
        }

        const onPressFoodItem = (item) => {
            const found = userFavorite.data.some(i => i._id === item._id)
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

        if (homeData.data.response ? homeData.data.response.loading : true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={styles.foodItemContainer}
                    onPress={() => { onPressFoodItem(item) }}>
                    <View style={{ marginBottom: sizes.padding }}>
                        <Image source={{ uri: item.url }} style={{ width: '100%', height: 300, borderRadius: sizes.radius }} resizeMode='cover' />
                        <View style={styles.cornerPrice}>
                            <Text style={{ ...fonts.fontMedium, fontWeight: "bold" }}>{thousand(item.price)}VNĐ</Text>
                        </View>
                    </View>
                    <Text style={{ ...fonts.fontMedium, fontWeight: "bold" }}>{item.name}</Text>
                </TouchableOpacity >
            )
        }
        return (
            <FlatList
                data={homeData.data !== [] ? homeData.data.response.categoryLists[selectedId].categoryData : null}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: '100%', alignItems: 'center' }}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="blue" />
                }
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderCustom isSearch title={'Home'} />
            {renderHeader()}
            {renderFoodList()}
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    foodItemContainer: {
        marginBottom: sizes.padding * 2,
        width: 350,
        borderBottomWidth: 1,
        paddingBottom: sizes.padding * 2,
        borderBottomColor: colors.accent,
    },
    cornerPrice: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: sizes.width * 0.3,
        backgroundColor: colors.white,
        borderTopRightRadius: sizes.radius,
        borderBottomLeftRadius: sizes.radius,
        borderWidth: 0.5,
        borderColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: 80,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: colors.accent
    },
    headerWrapper: {
        width: 50,
        height: 50,
        borderRadius: sizes.radius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 0.50,
        borderColor: colors.accent
    }
})
