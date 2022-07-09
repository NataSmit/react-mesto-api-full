class ApiAuth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => {
      throw new Error(data.message);
    });
  }

  registration(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this.checkResponse(res));
  }

  login(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this.checkResponse(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      credentials: 'include',
      headers: this._headers,
      
    }).then((res) => this.checkResponse(res));
  }

  getUserData(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this.checkResponse(res));
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    
  },
});
