import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes} from "../../http/DeviceAPI";
import {observer} from "mobx-react-lite";

export const CreateDevice = observer(({show, onHide}) => {

    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    //набо характеристик
    const [info, setInfo] = useState([])
    //запрос и сохранение элементов с бд
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    //вызов при выборе параметра
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    //характеристики
    const changeInfo = (key, value, number) => {
        //если номер не совподает возврощаем обьект не изменёным
        //если совпал возврощаем новый обьет (характеристику и по ключу заменяем поле)
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    //функция для запроса на сервер и добавления устройства
    const addDevice = () => {
        // console.log(info)
        //строка типа FormData
        const formData = new FormData()
        formData.append('name', name)
        //с конвертацией  в строку
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        //массив нельзя передвать. конвертация в jason строку
        formData.append('info', JSON.stringify(info))
        //если всё збс закрыть модальное окно
        createDevice(formData).then(data => onHide())
    }
    return (
        <>
            {/*сделать кнопку вызова*/}
            {/*<Button variant="primary" onClick={handleShow}>*/}
            {/*    Launch demo modal*/}
            {/*</Button>*/}

            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить устройство</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/*выподающее меню*/}
                        <Dropdown className="mt-2 mb-2">
                            {/*кнопка c выподающем меню*/}
                            <Dropdown.Toggle>
                                {/*Выберете тип*/}
                                {device.selectedType.name || "Выберете тип"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            {/*кнопка c выподающем меню*/}
                            <Dropdown.Toggle>
                                {/*Выберете бренд*/}
                                {device.selectedBrand.name || "Выберете бренд"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.brands.map(brand =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        {/*вводы*/}
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-3"
                            placeholder={"Введите название устройства"}
                        />
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className="mt-3"
                            placeholder={"Введите стоймость устройства"}
                            type="number"
                        />
                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={selectFile}
                        />
                        {/*разделительная черта*/}
                        <hr/>
                        <Button
                            variant={"outline-dark"}
                            onClick={addInfo}
                        >
                            Добавить новое свойство
                        </Button>
                        {info.map(i =>
                            //отрисовать элемент из списка
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={((e) => changeInfo('title', e.target.value, i.number))}
                                        placeholder="Введите название свойства"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={((e) => changeInfo('description', e.target.value, i.number))}
                                        placeholder="Введите описание свойства"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => removeInfo(i.number)}
                                    >
                                        удалить
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button variant="outline-success" onClick={addDevice}>
                        Добавить тип
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

