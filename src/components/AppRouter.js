import React, {useContext} from 'react';
import {Switch, Route, Redirect, Routes, qweqw} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {

    const {user} = useContext(Context)
    //console.log(user)

    //пользователь авторизован?
    //const isAuth = false
    return (
        //если будет введён некоректный запрос сработает Swich/Routes
        <Routes>
            {/* && всё сводит к bool значениям ивозврощает либо последний элемент либо последний false*/}
            {/*(массив).map(function(елемент,итдекс, массив){})//это цикл*/}
            {/*{} раскрывает содержание (элемента обьекта), [] для массива*/}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                //Route это путь для какой-либо страницы приложения
                //exact путь должен точно совподать (вроде устарел и можно не использоват)
                <Route key={path} path={path} element={Component} />
            )}
            {publicRoutes.map(({path, Component}) =>
                //Route это путь для какой-либо страницы приложения
                //exact путь должен точно совподать (вроде устарел и можно не использоват)
                <Route key={path} path={path} element={Component} />
            )}

        </Routes>
    );
};

export default AppRouter;