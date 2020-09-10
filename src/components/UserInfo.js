export default class UserInfo {
    constructor({name, job}) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
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