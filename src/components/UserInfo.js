export default class UserInfo {
    constructor(selectors) {
        this._name = document.querySelector(selectors.name);
        this._job = document.querySelector(selectors.job);
        this._avatar = document.querySelector(selectors.avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        };
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.about;
    }

    setAvatar(url) {
        this._avatar.src = url;
    }
}