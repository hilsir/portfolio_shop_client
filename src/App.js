import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Navbar, Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import "./index.css"
//observer при изменении перерендер
const App = observer(() => {
    //
    const {user} = useContext(Context)
    //
    const [loading, setLoading] = useState(true)
    //если функция пустя отработает 1 раз при создании компонента
    // useEffect если что меняется в массиве вызывается функция
    useEffect(() => {
        //раз в сек// таймер который практически не нужен
        //setTimeout(() => {
        //работает запрос
        //then выполнится после выполнения check
        check().then(data => {
            //если выполнено успешно
            user.setUser(true)
            user.setIsAuth(true)
            //после ответа выключить анимацию загрузки
            //finally выполнит последующий код в любом случае
        }).finally(() => setLoading(false))
        // })

    }, [])

    if (loading) {
        //анимация загрузки
        return <Spinner animation={"grow"}/>
    }


    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});
export default App;
