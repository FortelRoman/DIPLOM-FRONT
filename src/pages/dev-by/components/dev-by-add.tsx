import React, {FC, useState} from 'react';
import {
    Button,
    message,
    notification,
    Typography,
} from "antd";
import { UploadOutlined, DeleteOutlined, DownloadOutlined, SaveOutlined, PlayCircleFilled } from '@ant-design/icons';
import {DevByActions} from "../../../store/dev-by";
import {useAppDispatch} from "../../../store/hooks";
import {DevByAddModal} from "./dev-by-add-modal";
import {DevByPreview} from "./dev-by-preview";
import {downloadFile} from "../helpers/download-file";
import {TUploadData} from "../types/upload-date";

const {Title} = Typography;


type Props = {
    uploadData: TUploadData | null,
    setUploadData:  React.Dispatch<React.SetStateAction<TUploadData | null>>,

    uploadDataLoading: boolean,
    setUploadDataLoading: React.Dispatch<React.SetStateAction<boolean>>,

}


export const DevByAdd: FC<Props> = ({uploadData, uploadDataLoading, setUploadDataLoading, setUploadData}) => {
    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();


    const onParse = async () => {
        api.info({
            message: 'Запущен скрипт получения данных',
            description:
                'Это может занять несколько минут',
            duration: 0,
        });
        setUploadDataLoading(true)
        const res = await fetch('http://localhost:4000/api/dev-by/parse')
        const data1 = await res.json();
        setUploadData(data1)
        setUploadDataLoading(false)
        api.destroy()
        api.success({
            message: 'Получение данных завершено',
            description: 'Для записи данных в БД нажмите на кнопку СОХРАНИТЬ РЕЗУЛЬТАТ'
        });
    }


    const onDelete = () => {
        setUploadData(null)
    }

    const onDownload = () => {
        downloadFile(JSON.stringify(uploadData?.vacancies), uploadData?.date ||'dev-by.json')
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const saveResult = async () => {
        try {
            await dispatch(DevByActions.addItem(
                {date: uploadData?.date, file: uploadData?.vacancies}));
            message.success('save successfully');
        } catch (e) {
            message.success('save failed');
        } finally {
            setUploadData(null)
            await dispatch(DevByActions.getItems())
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {contextHolder}
            <div className={'buttons__add'}>
                <Button type="primary" onClick={onParse} loading={uploadDataLoading}
                        disabled={uploadDataLoading} icon={<PlayCircleFilled />}>Запустить скрипт</Button>
                <Button onClick={showModal} icon={<UploadOutlined />}>
                    Загрузить данные
                </Button>
            </div>
            {
                uploadData && (
                    <>
                        <Title level={3}>Результат выполнения скрипта</Title>
                        <div className={'buttons__save'}>
                            <Button type="primary" onClick={saveResult} icon={<SaveOutlined />}>
                                Сохранить результат
                            </Button>
                            <Button onClick={onDownload} shape="circle" icon={<DownloadOutlined />} className={'button__circle'}></Button>
                            <Button onClick={onDelete} shape="circle" icon={<DeleteOutlined />} className={'button__circle'}></Button>
                        </div>
                        <DevByPreview preview={uploadData?.vacancies}/>

                    </>
                )
            }
           <DevByAddModal isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk}/>
        </div>
    );
}

export default DevByAdd;