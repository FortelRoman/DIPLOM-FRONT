import { ProfileSelectors } from "../../store/auth";
import {useAppSelector} from "../../store/hooks";
import {Button, Space, Statistic, Typography} from "antd";
import {UserOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import React from "react";
import {ERole} from "../../types/role";
import './profile.css'
const {Title} = Typography;

const ProfilePage = () => {

    const {role, username, login} = useAppSelector(ProfileSelectors.profile)

    const onEdit = () => {

    }

    const onDelete = () => {

    }

    return <div className={'page'}>
        <div className={'page__title'}>
            <Title level={1}>Профиль</Title>
            <UserOutlined style={{fontSize: '35px'}} />
        </div>
        <Space size={40} className={'profile__buttons'}>
            <Button type={'primary'} onClick={onEdit} icon={<EditOutlined />}>Редактировать</Button>
            <Button onClick={onDelete} icon={<DeleteOutlined />}>Удалить</Button>
        </Space>
        <div className={'profile__statistic'}>
            <div>
                <Statistic title="Имя пользователя" value={username || '—'} />
            </div>
            <div>
                <Statistic title="Логин" value={login} />
            </div>
            <div>
                <Statistic title="Роль в системе" value={ERole[role] || '—'} />
            </div>
        </div>

        {/*<Spin spinning={!data}>*/}
        {/*    <div className={'item__statistic'}>*/}
        {/*        <div>*/}
        {/*            <Statistic title="Количество записей" value={data?.records?.length || '—'} />*/}
        {/*        </div>*/}
        {/*        <div>*/}
        {/*            <Statistic title="Дата добавления" value={formatDate(data?.date) || '—'} />*/}
        {/*        </div>*/}
        {/*        <div>*/}
        {/*            <Statistic title="Ресурс" value={data?.resource || '—'} />*/}
        {/*        </div>*/}
        {/*        <div className={'item__buttons'}>*/}
        {/*            <Button type={'primary'} onClick={onDownload} icon={<DownloadOutlined/>}>Скачать</Button>*/}
        {/*            {*/}
        {/*                (isAnalyst || isAdmin) && (*/}
        {/*                    <Button onClick={onDelete} icon={<DeleteOutlined/>}>Удалить</Button>*/}
        {/*                )*/}
        {/*            }*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <ResourcePreview preview={data?.records}/>*/}
        {/*</Spin>*/}
    </div>
}

export default ProfilePage;