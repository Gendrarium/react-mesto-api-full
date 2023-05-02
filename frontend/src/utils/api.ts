class Api {
  private _url: string;

  constructor({ url }: { url: string }) {
    this._url = url;
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  editUserInfo(data: { name: string; about: string }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  editAvatar(data: { avatar: string }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  addCard(data: { name: string; link: string }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteCard(id: string) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  likeCard(id: string) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  dislikeCard(id: string) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  _getResponseData(res: Response) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}
const api = new Api({
  url: process.env.REACT_APP_API || "",
});

export default api;
