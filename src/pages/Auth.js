import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Link, useHistory, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

//observer если изменяем состояния
const Auth = observer(() => {
    const {user} = useContext(Context)

    // получить маршут в строке запроса (хук)
    const location = useLocation()

    const history = useNavigate()

    //true если маршут(location.pathname) совподает с LOGIN_ROUTE
    const isLogin = location.pathname === LOGIN_ROUTE
    // console.log(location.pathname)
    //сейф локальных данных
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //запрос
    const click = async () => {
        try {
            let data;
            //console.log(isLogin + " !!!")
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            //если всё рбит то редирект
            history(SHOP_ROUTE)
        }catch (e){
            alert(e.response.data.message)
        }


    }
    return (
        <Container className="d-flex justify-content-center align-items-center"
            //оцентрализовать
                   style={{height: window.innerHeight - 54}}
        >
            {/*//рамка*/}
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder={"ведите email..."}
                        //ввод
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={"ведите пароль..."}
                        //ввод
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'

                    />

                    <Row className="d-flex flex-row justify-content-between ms-0 mt-3 pl-3 pr-3 mw-100">
                        {isLogin ?
                            <div className="w-auto">
                                Нет аккаунта? <Link to={REGISTRATION_ROUTE}
                                                    className="d-inline">Зарегистрируйся!</Link>
                            </div>
                            :
                            <div className="w-auto">
                                Есть аккаунт? <Link to={LOGIN_ROUTE} className="d-inline"> Войдите! </Link>
                            </div>
                        }
                        <Button
                            className="w-auto"
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? "войти" : "регистрация"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;



