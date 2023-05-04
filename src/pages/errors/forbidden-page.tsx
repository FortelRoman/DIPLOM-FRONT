import {Button, Typography} from "antd";
import React from "react";
import {DingtalkOutlined} from "@ant-design/icons";
import './style.css'
import {useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

const ForbiddenPage = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className={'error'}>
                <div className={'error__content'}>
                    <Title className={'error__title'}>Доступ запрещен</Title>
                    <Title className={'error__subtitle'} >Ошибка 403</Title>
                    <DingtalkOutlined style={{fontSize: '350px'}} className={'error__bg--left'}/>
                    <DingtalkOutlined style={{fontSize: '350px'}} className={'error__bg--right'}/>
                </div>
            </div>
            <div className={'error__info'}>
                <Text>У вас недостаточно прав для выполнения данного действия.</Text>
                <Text>Для перехода на главную страницу нажмите на кнопку ниже.</Text>
                <Button type={'primary'} onClick={() => navigate('/resources')}>Перейти на главную страницу</Button>
            </div>
        </>
    );

}

export default ForbiddenPage;