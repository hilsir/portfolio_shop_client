import React, {useContext, useEffect} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/DeviceAPI";
import {Pages} from "../components/Pages";

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        //rows?
        // кол элементов на стр
        fetchDevices(null, null, 1, 4).then(data => {
            device.setDevices(data.rows)
            //узнать сколько товаров получили
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        //вызыватся пари каждом изменении стр
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 4).then(data => {
            device.setDevices(data.rows)
            //узнать сколько товаров получили
            device.setTotalCount(data.count)
        })

    }, [device.page, device.selectedType, device.selectedBrand])

    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <Col md={3}>
                        <TypeBar/>
                    </Col>

                    <Col md={9}>
                        <BrandBar/>
                        <DeviceList/>
                        <Pages/>
                    </Col>

                </Row>
            </Container>
        </div>
    );
});

export default Shop;