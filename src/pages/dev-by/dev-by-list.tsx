import React, {useEffect, useState} from 'react';
import {Button, message, Table, Typography} from "antd";
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import {ColumnsType} from "antd/es/table";
import {DevByActions, DevBySelectors} from "../../store/dev-by";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import DevByAdd from "./components/dev-by-add";
import {downloadFile} from "./helpers/download-file";
import {TUploadData} from "./types/upload-date";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

interface DataType {
    date: string;
    count: any[];
    resource: string,
    _id: string;
}

export const DevByList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const data = useAppSelector(DevBySelectors.data)
    const [uploadData, setUploadData] = useState<TUploadData | null>(null);
    const [uploadDataLoading, setUploadDataLoading] = useState(false);

    const loading = useAppSelector(DevBySelectors.loading)

    const onDelete = async (id: string) => {
        try {
            await dispatch(DevByActions.deleteItem(id))
            message.success('delete successfully');
        } catch (e) {
            message.success('delete failed');
        } finally {
            await dispatch(DevByActions.getItems())
        }
    }

    const onDownload = async (id: string) => {
        try {
            const response = await dispatch(DevByActions.getItem(id))
            downloadFile(JSON.stringify(response.payload.vacancies), 'dev-by.json')
        } catch (e) {
            message.success('delete failed');
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
    }, [])


    return (
        <div className={'page'}>
            <Title level={1}>Devby.io</Title>
            <div className={!uploadData ? 'page__content' : ''}>
                <div>
                    <DevByAdd uploadData={uploadData} uploadDataLoading={uploadDataLoading} setUploadData={setUploadData} setUploadDataLoading={setUploadDataLoading}/>
                </div>
                <div>
                    <Title level={3}>Данные</Title>
                    <Table pagination={{pageSize: 9}} columns={columns} rowKey={'_id'} dataSource={data} loading={loading}
                           onRow={({ _id }) => ({ onClick: () => navigate( _id) })} />
                </div>
            </div>
        </div>
    );
}

export default DevByList;