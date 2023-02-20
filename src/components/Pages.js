import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Pagination} from "react-bootstrap";
import {LOGIN_ROUTE} from "../utils/consts";

export const Pages = observer(() => {

    const {device} = useContext(Context)
    //const pages = [1, 2, 3, 4, 5]
    //общее кол страниц колтовара / кол товара на 1 стр
    //ceil округляет
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []
    // console.log(device.totalCount)
    // console.log(device.limit)
    // console.log(pageCount)
    for (let i = 0; i < pageCount; i++) {
        //номер стр
        pages.push(i + 1)

    }
    return (
        //страницы
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item

                    key={page}
                    // выделить текющую стр
                    active={device.page === page}
                    // при нажатии выделить текющую стр
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

