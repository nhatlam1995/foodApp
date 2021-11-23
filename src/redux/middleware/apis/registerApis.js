export async function postRegister(email, phonenumber, password, fullname) {
    data = {
        email: email,
        phonenumber: phonenumber,
        password: password,
        fullname: fullname
    }

    const response = await fetch('https://powerful-wave-73395.herokuapp.com/api/auth/register/', {
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