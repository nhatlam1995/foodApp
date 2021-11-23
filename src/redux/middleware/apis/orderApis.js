import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Add_Order(data) {

    console.log('ccccccccccc', data)

    const value = await AsyncStorage.getItem('token')

    const response = await fetch('https://powerful-wave-73395.herokuapp.com/api/orders/createOrders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + value
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .then(result => {
            console.log('reeeeeeeeeeeeee', result)
            return result
        })
        .catch((error) => {
            console.log('Order Api error', error);
        });
    return response
}