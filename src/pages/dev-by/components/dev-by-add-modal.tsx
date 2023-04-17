import {DatePicker, Modal, notification, Typography, Upload, UploadFile, UploadProps} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, {FC, useState} from "react";
import {DevByActions} from "../../../store/dev-by";
import {useAppDispatch} from "../../../store/hooks";
import {Dayjs} from "dayjs";
const {Text} = Typography;

type Props = {
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
}

type TData = {
    date: Dayjs | null,
    file: UploadFile | null,
}
export const DevByAddModal: FC<Props> = ({isModalOpen, handleOk, handleCancel}) => {
    const dispatch = useAppDispatch();
    const [data, setData] = useState<TData>({date: null, file: null});

    const onSubmit = () => {
        console.log(data);
        let reader = new FileReader();
        // @ts-ignore
        reader.readAsText(data.file);

        reader.onload = async function() {
            const result = JSON.parse(String(reader.result));
            try {
               await dispatch(DevByActions.addItem(
                    {date: data.date?.format(('YYYY-MM-DD')) || '', file: result}));
                setData({date: null, file: null});
                notification.open({
                    type: "success",
                    message: 'Запись добавлена успешно',
                });
            } catch (e) {
                notification.open({
                    type: "error",
                    message: 'Ошибка добавления записи',
                });
            } finally {
                await dispatch(DevByActions.getItems())
            }
        }

        reader.onerror = function() {
            console.log(reader.error);
        };
        handleOk()
    }

    const onCancel = () => {
        console.log(data);
        handleCancel()
    }

    const props: UploadProps = {
        onRemove: () => {
            setData(prev => ({...prev, file: null}));
        },
        beforeUpload: (file) => {
            console.log(file.type)
            if (file.type === 'application/json') {
                setData(prev => ({...prev, file: file}));
                return false;
            } else {
                notification.open({
                    type: "error",
                    message: `${file.name} не является JSON файлом`,
                });
                return Upload.LIST_IGNORE;
            }
        },
        // @ts-ignore
        file: data.file,
        // @ts-ignore
        fileList : data.file ? [data.file] : undefined,
        accept: 'json'
    };


    return  (
        <Modal title="Добавление данных" open={isModalOpen} onOk={onSubmit} onCancel={onCancel} centered>
        <div>
            <Text className={"field__label"}>Дата</Text>
            <DatePicker value={data.date} onChange={(value) => setData((prev) => ({...prev, date: value}))}/>
        </div>
        <div>
            <Text className={"field__label"}>Файл</Text>
            {/*<Upload {...props} listType={"text"} maxCount={1}>*/}
            {/*    <Button icon={<UploadOutlined />}>Select File</Button>*/}
            {/*</Upload>*/}
            <Dragger {...props}>
                {/*<p className="ant-upload-drag-icon">*/}
                {/*    <InboxOutlined />*/}
                {/*</p>*/}
                <p className="ant-upload-text">Нажмите или перетащите файл в эту область для загрузки</p>
                <p className="ant-upload-hint">
                    Поддерживаемый формат файла: JSON
                </p>
            </Dragger>
        </div>
    </Modal>
    )
}