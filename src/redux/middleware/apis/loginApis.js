export async function postLogin(email, password) {
    data = {
        email: email,
        password: password
    }

    const response = await fetch('https://powerful-wave-73395.herokuapp.com/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .then(result => {
            return result
        })
        .catch((error) => {
            console.log('API Login Error', error);
        });
    return response
}