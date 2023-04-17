import React, {useEffect, useState} from 'react';
import {Button, Typography, Row, Col, notification} from "antd";
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import {DevByActions} from "../../store/dev-by";
import {useAppDispatch} from "../../store/hooks";
import {DevByPreview} from "./components/dev-by-preview";
import {downloadFile} from "./helpers/download-file";
import {useNavigate, useParams} from "react-router-dom";

const {Title, Text} = Typography;

interface DataType {
    date: string;
    vacancies: any[];
    resource: string,
    _id: string;
}

export const DevByItem = () => {

    const dispatch = useAppDispatch();
    const {id} = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<DataType>()

    const onDelete = async () => {
        try {
            id && await dispatch(DevByActions.deleteItem(id)).unwrap()
            notification.open({
                type: "success",
                message: 'Запись удалена успешно',
            });
            navigate('/dev-by')
        } catch (e) {
            notification.open({
                type: "error",
                message: 'Ошибка удаления записи',
            });
        } finally {
            await dispatch(DevByActions.getItems())
        }
    }

    const onDownload = async () => {
        try {
            if (id) {
                const response = await dispatch(DevByActions.getItem(id))
                downloadFile(JSON.stringify(response), 'dev-by.json')
                notification.open({
                    type: "success",
                    message: 'Скачивание выполненно успешно',
                });
            }
        } catch (e) {
            notification.open({
                type: "error",
                message: 'Ошибка скачивания записи',
            });
        }
    }

    const getData = async (id: string) => {
        const response = await dispatch(DevByActions.getItem(String(id)))
        console.log(response)
        // @ts-ignore
        setData(response.payload)
    }


    useEffect(() => {
        id && getData(id)
    }, []) // eslint-disable-line


    return (
        <div className={'page'}>
            <Row>
                <Col flex={'300px'}>
                    <Title level={4}>Дата</Title>
                    <Text>{data?.date}</Text>
                    <Title level={4}>Количество вакансий</Title>
                    <Text>{data?.vacancies?.length}</Text>
                    <Title level={4}>Ресурс</Title>
                    <Text>{data?.resource}</Text>

                </Col>
                <Col flex={'auto'}>
                    <div className={'buttons__save'}>
                        <Button type={'primary'} onClick={onDownload} icon={<DownloadOutlined/>}>Скачать</Button>
                        <Button onClick={onDelete} icon={<DeleteOutlined/>}>Удалить</Button>
                    </div>
                    <Title level={4}>Предпросмотр</Title>
                    <DevByPreview preview={data?.vacancies}/>
                </Col>
            </Row>
        </div>
    );
}

export default DevByItem;