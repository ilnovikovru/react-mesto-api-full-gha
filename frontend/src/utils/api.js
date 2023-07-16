class Api {
  constructor(config) {
    this._baseUrl = config.url;
  }

  _getHeaders(token) {
    return {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  getUserInfo(token) {
    return this._request('/users/me', {
      method: 'GET',
      headers: this._getHeaders(token)
    });
  }

  setUserInfo(token, data) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._getHeaders(token),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  setUserAvatar(token, data) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._getHeaders(token),
      body: JSON.stringify({
        avatar: data.avatar,
      })
    });
  }

  getInitialCards(token) {
    return this._request('/cards', {
      method: 'GET',
      headers: this._getHeaders(token)
    });
  }

  editUserInfo(token, data) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._getHeaders(token),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  addCard(token, data) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._getHeaders(token),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(token, _id) {
    return this._request(`/cards/${_id}`, {
      method: 'DELETE',
      headers: this._getHeaders(token)
    });
  }

  likeCard(token, _id) {
    return this._request(`/cards/${_id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(token)
    });
  }

  dislikeCard(token, _id) {
    return this._request(`/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(token)
    });
  }

  changeLikeCardStatus(token, cardId, like) {
    if (like) {
      return this.likeCard(token, cardId);
    } else {
      return this.dislikeCard(token, cardId);
    }
  }

  editAvatar(token, data) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._getHeaders(token),
      body: JSON.stringify({
        avatar: data.link,
      })
    }).then(console.log());
  }
}

const apiConfig = new Api({
  url: 'https://ilnovikovru.nomoredomains.work/api',
});

console.log(apiConfig);

export default apiConfig;
