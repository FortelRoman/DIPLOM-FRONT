import React, {useEffect, useState} from 'react';
import {Button, Typography, notification, Statistic, Spin} from "antd";
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import {DevByActions} from "../../store/dev-by";
import {useAppDispatch} from "../../store/hooks";
import {DevByPreview} from "./components/dev-by-preview";
import {downloadFile} from "./helpers/download-file";
import {useNavigate, useParams} from "react-router-dom";
import './dev-by-item.css'
import {formatDate} from "../../helpers/format-date";
import DevByIcon from "../../icons/dev-by-icon";

const {Title} = Typography;

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
            navigate('/resources/dev-by')
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
            <div className={'page__title'}>
                <Title level={1}>Вакансии</Title>
                <DevByIcon />
            </div>
            <Spin spinning={!data}>
                <div className={'item__statistic'}>
                    <div>
                        <Statistic title="Количество записей" value={data?.vacancies?.length || '—'} />
                    </div>
                    <div>
                        <Statistic title="Дата добавления" value={formatDate(data?.date) || '—'} />
                    </div>
                    <div>
                        <Statistic title="Ресурс" value={data?.resource || '—'} />
                    </div>
                    <div className={'item__buttons'}>
                        <Button type={'primary'} onClick={onDownload} icon={<DownloadOutlined/>}>Скачать</Button>
                        <Button onClick={onDelete} icon={<DeleteOutlined/>}>Удалить</Button>
                    </div>
                </div>
                <DevByPreview preview={data?.vacancies}/>
            </Spin>
        </div>
    );
}

export default DevByItem;