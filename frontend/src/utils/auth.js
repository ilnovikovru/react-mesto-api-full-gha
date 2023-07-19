import apiConfig from './api';
export const BASE_URL = 'https://ilnovikovru.nomoredomains.work/api'; // http://localhost:3000/api

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
    }).then(data => {
        console.log("Полученные данные: ", data); // Вывод всех полученных данных
        return data;
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
