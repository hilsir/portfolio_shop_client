import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        //переменную с нижним подчёркиванием нельзя изменять
        this._isAuth = true
        this._user = {}
        //при изменении компонентов перерендеривает их
        makeAutoObservable(this)
    }

    //экшены // функции изменяющие состояние
    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    // используются если переменная была изменена
    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}