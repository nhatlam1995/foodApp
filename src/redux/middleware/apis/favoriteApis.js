import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Get_User_Favorite() {
    const value = await AsyncStorage.getItem('token');

    const response = await fetch('https://powerful-wave-73395.herokuapp.com/api/favorites/getFavorites', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + value
        },
    }).then(response => response.json())
        .then(result => {
            return result
        })
        .catch((error) => {
            console.log('Error get user favorite', error);
        });
    return response
}

export async function Remove_User_Favorite(itemId) {
    const value = await AsyncStorage.getItem('token');

    const response = await fetch(`https://powerful-wave-73395.herokuapp.com/api/foods/deleteFoodFromFavorite/${itemId.payload}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + value
        },
    }).then(response => response.json())
        .then(result => {
            return result
        })
        .catch((error) => {
            console.log('Error remove user favorite', error);
        });
    return response
}

export async function Set_User_Favorite(itemId) {
    const value = await AsyncStorage.getItem('token');

    const response = await fetch(`https://powerful-wave-73395.herokuapp.com/api/foods/addFoodIntoFavorite/${itemId.payload}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + value
        },
    }).then(response => response.json())
        .then(result => {
            return result
        })
        .catch((error) => {
            console.log('Error set user favorite', error);
        });
    return response
}