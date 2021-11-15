import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Get_Category_Info() {

    const value = await AsyncStorage.getItem('token')

    const response = await fetch('https://powerful-wave-73395.herokuapp.com/api/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + value
        },
    }).then(response => response.json())
        .then(result => {
            return result
        })
        .catch((error) => {
            console.log('API Home Error', error);
        });
    return response
}