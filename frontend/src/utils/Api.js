class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkResponse(res) {
    if (!res.ok) {
    
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json()
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
    
      .then((res) => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
    
    .then((res) => this._checkResponse(res))
  }

  editProfile(info) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
    .then((res) => this._checkResponse(res))
      
  }

  addCard(obj) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        link: obj.link
      })
    })
      .then((res) => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  }
  
  handleLikeClick(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  }

  updateAvatar(obj) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatar
      })
    })
      .then((res) => this._checkResponse(res))
      
  }

}

export const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
     
    'Content-Type': 'application/json'
  }
}); 