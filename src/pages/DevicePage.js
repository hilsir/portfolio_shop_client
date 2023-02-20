import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import like from '../assets/like.png'
import disLike from '../assets/disLike.png'
import star from '../assets/star.png'
import bigStar from '../assets/bigStar.png'
import {useParams} from "react-router-dom";
import {fetchDevices, fetchOneDevice} from "../http/DeviceAPI";

const DevicePage = () => {

    const [device, setDevice] = useState(null)
    const [star, setStar] = useState(0)
    // id из url строки
    const {id} = useParams()
    //console.log(params)
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))

    }, [])

    // useEffect(() => {
    // //тригер для изменения оценки девайса
    //
    // }, [star])

    //console.log(device)

    // const device = {
    //     id: 1,
    //     name: "Iphone 12 pro",
    //     price: 25000,
    //     rating: 5,
    //     img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'
    // }
    // const description = [
    //     {id: 1, title: 'опер пам', description: " 5гб"},
    //     {id: 2, title: 'камер', description: " 12мп"},
    //     {id: 3, title: 'проц', description: "пентиум"},
    //     {id: 4, title: 'кол ядер', description: " 4000"}
    // ]
    // device && костыль . загружается быстрее чем страница .




    return device && (
        // <Container className="mt-3 d-flex flex-column align-items-center ms-0 w-auto">
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    {/*направление в колонку*/}
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        {/*звёздочка с рейтингом была по середине*/}
                        <div className="d-flex align-items-center justify-content-center"
                             style={{
                                 background: `url(${bigStar}) no-repeat center center`,
                                 width: 240,
                                 height: 240,
                                 backgroundSize: 'cover',
                                 fontSize: 64
                             }}
                            // onClick={}
                        >
                            {device.rating}
                        </div>
                        {/*like !!!!*/}
                        {/*<div className="d-flex justify-content-between w-50">*/}
                        {/*    <div className="d-flex align-items-center justify-content-center"*/}
                        {/*         style={{*/}
                        {/*             background: `url(${like}) no-repeat center center`,*/}
                        {/*             width: 20,*/}
                        {/*             height: 20,*/}
                        {/*             backgroundSize: 'cover',*/}
                        {/*         }}*/}
                        {/*    >*/}
                        {/*    </div>*/}
                        {/*    <div className="d-flex align-items-center justify-content-center"*/}
                        {/*         style={{*/}
                        {/*             background: `url(${disLike}) no-repeat center center`,*/}
                        {/*             width: 20,*/}
                        {/*             height: 20,*/}
                        {/*             backgroundSize: 'cover',*/}
                        {/*         }}*/}
                        {/*         // onClick={}*/}
                        {/*    >*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*    like !!!!*/}

                        {/*  STAR  !!!!>*/} {/*  ЗАНЕСТИ В ОТДЕЛЬНЫЙ КЛАСС !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>*/}
                        <div className="d-flex align-items-center justify-content-center">
                               {/*//система оценки (если у меня из будущего будут вопросы -> сделано на коленке)*/}
                            {[0,0,0,0,0].map((el, i) => {

                                // console.log(i)

                                if (star > i) {
                                    return <div className="d-flex align-items-center justify-content-center star-hover"
                                                onClick={() => {
                                                    setStar(++i)
                                                //    Функция для отправки оценки !!!!!!!!!!!!!!!!!!!!!!!!
                                                }}
                                                key={Math.random()}
                                    />
                                } else {
                                    return <div className="d-flex align-items-center justify-content-center star"
                                                onClick={() => {
                                                    setStar(++i)
                                                //    Функция для отправки оценки !!!!!!!!!!!!!!!!!!!!!!!!
                                                }}
                                                key={Math.random()}
                                    />
                                }
                            })}

                        </div>


                        {/*  STAR  !!!!<*/}
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        // оцентровать в колонку. по центру . оцентровать по горизонтли
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price}руб.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>

                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column mt-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;

