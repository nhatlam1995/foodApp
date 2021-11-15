import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Get_User_Info() {

    const value = await AsyncStorage.getItem('token')

    const response = await fetch('https://powerful-wave-73395.herokuapp.com/api/auth/', {
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
            console.log('User Api error', error);
        });
    return response
}