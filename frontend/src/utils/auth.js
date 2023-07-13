export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else if (res.status === 400) {
        throw new Error("Некорректно заполнено одно из полей");
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

function request(endpoint, options) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

export const register = (email, password) => {
    return request('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
};

export const authorize = (email, password) => {
    return request('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
};

export const checkToken = (token) => {
    return request('/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};