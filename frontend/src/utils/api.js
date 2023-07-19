class Api {
  constructor(config) {
    this._baseUrl = config.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    console.log(`Выполняется запрос: ${this._baseUrl}${endpoint}`);
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  getUserInfo(token) {
    return this._request('/users/me', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
  }  

  setUserInfo(data, token) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  setUserAvatar(data, token) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    });
  }

  getInitialCards(token) {
    return this._request('/cards', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
  }

  editUserInfo(data, token) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  addCard(data, token) {
    return this._request('/cards', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(_id, token) {
    return this._request(`/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
  }

  likeCard(_id, token) {
    return this._request(`/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
  }

  dislikeCard(_id, token) {
    return this._request(`/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
  }

  changeLikeCardStatus(cardId, like, token) {
    if (like) {
      return this.likeCard(cardId, token);
    } else {
      return this.dislikeCard(cardId, token);
    }
  }

  editAvatar(data, token) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.link,
      })
    }).then(console.log);
  }
}

const apiConfig = new Api({
  url: 'https://ilnovikovru.nomoredomains.work/api', // http://localhost:3000/api
});

export default apiConfig;
