import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CartScreen from "../components/screens/User/CartScreen";
import FavoriteScreen from "../components/screens/User/FavoriteScreen";
import FoodDetailScreen from "../components/screens/User/FoodDetailScreen";
import HomeScreen from "../components/screens/User/HomeScreen";
import HistoryScreen from "../components/screens/User/Profile/HistoryScreen";
import MapScreen from "../components/screens/User/Profile/MapScreen";
import MembershipScreen from "../components/screens/User/Profile/MembershipScreen";
import OrderDetailScreen from "../components/screens/User/Profile/OrderDetailScreen";
import ProfileScreen from "../components/screens/User/Profile/ProfileScreen";
import SettingsScreen from "../components/screens/User/Profile/SettingsScreen";
import SearchScreen from "../components/screens/User/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='FoodDetail' component={FoodDetailScreen} />
        </Stack.Navigator>
    )
}

function FavoritesStack() {
    return (
        <Stack.Navigator
            initialRouteName='FavoriteScreen'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='FavoriteScreen' component={FavoriteScreen} />
            <Stack.Screen name='FoodDetail' component={FoodDetailScreen} />
        </Stack.Navigator>
    )
}

function CartStack() {
    return (
        <Stack.Navigator
            initialRouteName='CartScreen'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='CartScreen' component={CartScreen} />
            <Stack.Screen name='FoodDetail' component={FoodDetailScreen} />
        </Stack.Navigator>
    )
}

function SearchStack() {
    return (
        <Stack.Navigator
            initialRouteName='SearchScreen'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SearchScreen' component={SearchScreen} />
            <Stack.Screen name='FoodDetail' component={FoodDetailScreen} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator
            initialRouteName='ProfileScreen'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='HistoryScreen' component={HistoryScreen} />
            <Stack.Screen name='OrderDetailScreen' component={OrderDetailScreen} />
            <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
            <Stack.Screen name='MapScreen' component={MapScreen} />
            <Stack.Screen name='MembershipScreen' component={MembershipScreen} />
        </Stack.Navigator>
    )
}

export default function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4dc2f8',
                tabBarInactiveTintColor: 'grey'
            }}>
            <Tab.Screen name='Search' component={SearchStack}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="search" color={color} size={size} />
                    )
                }} />

            <Tab.Screen name="Favorites" component={FavoritesStack}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="favorite-border" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Home" component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0, // space from bottombar
                                height: 60,
                                width: 60,
                                borderRadius: 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <MaterialCommunityIcons name="home" color={color} size={60} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Cart" component={CartStack}
                options={{
                    tabBarLabel: 'Cart',
                    // tabBarBadge: quantity,
                    tabBarBadgeStyle: { backgroundColor: '#4dc2f8', color: 'white', left: 5, top: -1, justifyContent: 'center', alignItems: 'center', fontSize: 12 },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-o" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
