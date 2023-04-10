import React, {useState} from 'react';
import {Button, message, Upload, UploadFile, UploadProps} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import {RcFile} from "antd/es/upload";

export const App = () => {


    const onCLick = async () => {
        const res = await fetch('http://localhost:4000/api/dev-by')
        const data = await res.json();
        console.log(data)
    }

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file:  UploadFile) => {
            formData.append('files[]', file as RcFile);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('http://localhost:4000/api/dev-by', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };



    return (
    <div>
        <Button onClick={onCLick}>parse</Button>
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
        >
            {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
    </div>
  );
}

export default App;
