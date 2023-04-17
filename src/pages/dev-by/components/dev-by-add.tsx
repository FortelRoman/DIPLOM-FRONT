import React, {useState} from 'react';
import {
    Button,
    notification,
    Typography,
} from "antd";
import { UploadOutlined, DeleteOutlined, DownloadOutlined, SaveOutlined, PlayCircleFilled } from '@ant-design/icons';
import {DevByActions, DevBySelectors} from "../../../store/dev-by";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {DevByAddModal} from "./dev-by-add-modal";
import {DevByPreview} from "./dev-by-preview";
import {downloadFile} from "../helpers/download-file";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

export const DevByAdd = () => {
    const dispatch = useAppDispatch();
    const uploadData = useAppSelector(DevBySelectors.uploadData)
    const uploadDataLoading = useAppSelector(DevBySelectors.uploadDataLoading)
    const navigate = useNavigate();


    const onParse = async () => {
        try {
            notification.open({
                type: 'info',
                message: 'Запущен скрипт получения данных',
                description:
                    'Это может занять несколько минут',
                duration: 0,
                key: 'parse'
            })
            await dispatch(DevByActions.parseItem()).unwrap();
            notification.open({
                message: 'Получение данных завершено',
                description: <><span>Для записи </span>
                    {/*@ts-ignore*/}
                    <Button type={'link'} onClick={() => navigate('/dev-by')}>данных</Button><span> в БД нажмите на кнопку СОХРАНИТЬ РЕЗУЛЬТАТ'</span></>,
                type: 'success',
                duration: 0,
            });
        } catch (e) {
            console.log('catch')
            notification.open({
                message: 'Ошибка выполнения скрипта',
                description: 'Попробуйте снова, если ошибка повторится обратитесь к администратору',
                type: 'error',
                duration: 0,
            });
        } finally {
            notification.destroy('parse')
        }
    }


    const onDelete = () => {
        notification.destroy('parse');
        dispatch(DevByActions.resetUploadData())
    }

    const onDownload = () => {
        try {
            downloadFile(JSON.stringify(uploadData?.vacancies), uploadData?.date ||'dev-by.json')
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const saveResult = async () => {
        try {
            await dispatch(DevByActions.addItem(
                {date: uploadData?.date, file: uploadData?.vacancies})).unwrap();
            notification.destroy('parse');
            notification.open({
                type: 'success',
                message: 'Запись сохранена успешно',
            })
        } catch (e) {
            notification.open({
                type: 'error',
                message: 'Ошибка сохранения записи',
            })
        } finally {
            dispatch(DevByActions.resetUploadData())
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