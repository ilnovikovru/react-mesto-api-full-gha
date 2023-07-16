class Api {
  constructor(config) {
    this._baseUrl = config.url;
  }

  setToken(token) {
    console.log("Токен установлен: ", token);
    this._headers = {
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

  getUserInfo() {
    return this._request('/users/me', {
      method: 'GET',
      headers: this._headers
    });
  }

  setUserInfo(data) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  setUserAvatar(data) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    });
  }

  getInitialCards() {
    return this._request('/cards', {
      method: 'GET',
      headers: this._headers
    });
  }

  editUserInfo(data) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  addCard(data) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(_id) {
    return this._request(`/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  likeCard(_id) {
    return this._request(`/cards/${_id}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  dislikeCard(_id) {
    return this._request(`/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  changeLikeCardStatus(cardId, like) {
    if (like) {
      return this.likeCard(cardId);
    } else {
      return this.dislikeCard(cardId);
    }
  }

  editAvatar(data) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    }).then(console.log());
  }
}

const apiConfig = new Api({
  url: 'https://ilnovikovru.nomoredomains.work/api',
});

export default apiConfig;
