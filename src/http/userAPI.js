import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (email, password) => {
    //запрос на сервер // отправка пороля. почты и роли
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    //сохранение токена
    //сохраняет гдет в браузере токен для посторного использования
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    //запрос на сервер // отправка пороля. почты
    const {data} = await $host.post('api/user/login', {email, password})
    //сохранение токена
    //сохраняет гдет в браузере токен для посторного использования
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    //запрос на сервер // отправка пороля. почты и роли
    const {data} = await $authHost.get('api/user/auth')
    //сохраняет гдет в браузере токен для посторного использования
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}