import React, {useEffect} from 'react';
import {Button, notification, Table, Typography} from "antd";
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import {ColumnsType} from "antd/es/table";
import {DevByActions, DevBySelectors} from "../../store/dev-by";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import DevByAdd from "./components/dev-by-add";
import {downloadFile} from "./helpers/download-file";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

interface DataType {
    date: string;
    count: any[];
    resource: string,
    _id: string;
}

const DevByList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const data = useAppSelector(DevBySelectors.data)
    const uploadData = useAppSelector(DevBySelectors.uploadData)

    const loading = useAppSelector(DevBySelectors.loading)

    const onDelete = async (id: string) => {
        try {
            await dispatch(DevByActions.deleteItem(id)).unwrap()
            notification.open({
                type: "success",
                message: 'Запись удалена успешно',
            });
        } catch (e) {
            notification.open({
                type: "error",
                message: 'Ошибка удаления записи',
            });
        } finally {
            await dispatch(DevByActions.getItems())
        }
    }

    const onDownload = async (id: string) => {
        try {
            const response = await dispatch(DevByActions.getItem(id)).unwrap()
            downloadFile(JSON.stringify(response.vacancies), 'dev-by.json')
            notification.open({
                type: "success",
                message: 'Скачивание выполненно успешно',
            });
        } catch (e) {
            notification.open({
                type: "error",
                message: 'Ошибка скачивания записи',
            });
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Дата',
            dataIndex: 'date',
        },
        {
            title: 'Ресурс',
            dataIndex: 'resource',
        },
        {
            title: 'Количество вакансий',
            dataIndex: 'count',
        },
        {
            title: 'Действие',
            dataIndex: '_id',
            width: 150,
            render: (value) => <>
                <Button onClick={(e) => {
                    e.stopPropagation()
                    onDownload(value)
                }} shape={'circle'} icon={<DownloadOutlined />} className={'button__circle'}/>
                <Button onClick={(e) => {
                    e.stopPropagation()
                    onDelete(value)
                }} shape={'circle'} icon={<DeleteOutlined />} className={'button__circle'} />
            </>
        }
    ];

    useEffect(() => {
        dispatch(DevByActions.getItems())
    }, []) // eslint-disable-line


    return (
        <div className={'page'}>
            <Title level={1}>Вакансии devby</Title>
            <div className={!uploadData ? 'page__content' : ''}>
                <div>
                    <DevByAdd />
                </div>
                <div>
                    <Table pagination={{pageSize: 9}} columns={columns} rowKey={'_id'} dataSource={data} loading={loading}
                           onRow={({ _id }) => ({ onClick: () => navigate( _id) })} />
                </div>
            </div>
        </div>
    );
}

// @ts-ignore
export default DevByList;