import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
//отслеживание изменений сотояний
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

        const logOut = () => {
            user.setUser({})
            user.setIsAuth(false)
        }


    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink
                    style={{color: 'white'}}
                    onClick={() => history(SHOP_ROUTE)}
                >Купи Девайс</NavLink>
                {/*//админ?*/}
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE)}
                        >
                            Админ Панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ms-2"
                            //onClick={() => history(LOGIN_ROUTE)}
                            //выход
                            onClick={() => logOut()}
                        >

                            Выйти
                        </Button>
                    </Nav>
                    // Не админ?
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;