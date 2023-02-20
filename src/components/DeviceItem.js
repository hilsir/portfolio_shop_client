import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";


const DeviceItem = ({device}) => {
    //динамичестое преключение по страницам
    const history = useNavigate()
    //console.log(history)
    return (
        <Col md={3} className="w-auto mt-3" onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                {/*                  !!!                     */}
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                {/*чтобы надпись и прочие элементы разошлись по сторонам*/}

                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    {/*<div>Samsung...</div>*/}
                    {/*чтобы звезда не ухадила на новую строку*/}
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={19} height={19} src={star}/>
                    </div>
                    <div>{device.name}</div>
                </div>

            </Card>
        </Col>
    );
};

export default DeviceItem;