import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
//observer -> чтобы mobx отслеживал изменения
const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ul className="list-group">
            {device.types.map(type =>
                //list-group-item-action href="#" //эфект кликабельноти
                <a href="#" className="list-group-item list-group-item-action"
                    key={type.id}//обязателен если рендерем масив элементов
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </a>
            )}
        </ul>
    );
});

export default TypeBar;