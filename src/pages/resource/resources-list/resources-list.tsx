import React, {useEffect} from 'react';
import {Button, notification, Table, Typography} from "antd";
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import {ColumnsType} from "antd/es/table";
import {DevByActions, DevBySelectors} from "../../../store/resources";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import ResourceAdd from "../components/resource-add";
import {downloadFile} from "../../../helpers/download-file";
import {useNavigate} from "react-router-dom";
import './resources-list.css'
import {formatDate} from "../../../helpers/format-date";
import DevByIcon from "../../../icons/dev-by-icon";
import {TResource} from "../../../types/resource";

const {Title} = Typography;

const ResourcesList = () => {
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
            downloadFile(JSON.stringify(response.records, null, '\t'), 'dev-by.json')
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

    const columns: ColumnsType<TResource> = [
        {
            title: 'Дата',
            dataIndex: 'date',
            render: value => formatDate(value)
        },
        {
            title: 'Ресурс',
            dataIndex: 'resource',
        },
        {
            title: 'Количество',
            dataIndex: 'records',
        },
        {
            title: 'Действие',
            dataIndex: '_id',
            width: 150,
            render: (value) => <>
                <Button type={'primary'} onClick={(e) => {
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
            <div className={'page__title'}>
                <Title level={1}>Вакансии</Title>
                <DevByIcon />
            </div>
            <div className={!uploadData ? 'page__content' : ''}>
                <div>
                    <ResourceAdd />
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
export default ResourcesList;