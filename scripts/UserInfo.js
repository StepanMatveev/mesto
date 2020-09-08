export default class UserInfo {
    constructor(obj) {
        this._name = document.querySelector(obj.name);
        this._job = document.querySelector(obj.job);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        };
    }

    setUserInfo(nameValue, jobValue) {
        this._name.textContent = nameValue;
        this._job.textContent = jobValue;
    }
}