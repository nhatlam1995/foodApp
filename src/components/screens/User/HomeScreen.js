import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
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

    const homeData = useSelector((state) => state.home);

    useEffect(() => {
        const getCategoryAction = getCategory();
        const getUserFavoriteAction = getUserFavorite();
        const getUserInfoAction = getUserInfo();
        dispatch(getCategoryAction);
        dispatch(getUserFavoriteAction);
        dispatch(getUserInfoAction);
    }, [])

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
                    style={{ width: 80, height: 110, backgroundColor: index === selectedId ? colors.accent : colors.white, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginHorizontal: 5, marginVertical: 5, borderWidth: 1, borderColor: colors.accent }}>
                    <View style={{ width: 50, height: 50, borderRadius: sizes.radius, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: 0.50, borderColor: colors.accent }}>
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
                    style={{
                        marginBottom: sizes.padding * 2, width: 350, borderBottomWidth: 1, paddingBottom: sizes.padding * 2, borderBottomColor: colors.accent,

                    }}
                    onPress={() => navigate('FoodDetail', {
                        id: item._id,
                        url: item.url,
                        weight: item.weight,
                        price: item.price,
                        name: item.name,
                        nation: item.nation,
                        status: item.status,
                        description: item.description
                    })}>
                    <View
                        style={{
                            marginBottom: sizes.padding,
                        }}
                    >
                        <Image source={{ uri: item.url }} style={{ width: '100%', height: 300, borderRadius: sizes.radius }} resizeMode='cover' />
                        <View
                            style={{
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
                            }}
                        >
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

const styles = StyleSheet.create({})
