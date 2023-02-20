import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";


const BrandBar = observer(() => {
    const {device} = useContext(Context)
    //console.log(device);
    return (
        <Row className="d-flex flex-row flex-nowrap">
            {device.brands.map(brand =>
                <Card
                    className="p-3 w-auto"
                    //изменение курсора при наведении
                    style={{cursor:'pointer'}}
                    key={brand.id}//обязателен если рендерем масив элементов
                    onClick={()=>device.setSelectedBrand(brand)}
                    //изменение цвета рамки при наведении
                    border={brand.id === device.selectedBrand.id? 'danger':'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;