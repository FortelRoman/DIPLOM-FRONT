import {Button, notification, Table, Typography} from "antd";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import React, {useEffect} from "react";
import {ColumnsType} from "antd/es/table";
import {TUser} from "../../types/user";
import {UsersActions, UsersSelectors} from "../../store/users";
import {DeleteOutlined, UserOutlined} from "@ant-design/icons";
import RoleSwitch from "./role-switch";
const {Title} = Typography;

const Users = () => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(UsersSelectors.data)
    const loading = useAppSelector(UsersSelectors.loading)

    const onDelete = async (id: string) => {
        try {
            await dispatch(UsersActions.deleteItem(id)).unwrap()
            notification.open({
                type: "success",
                message: 'Пользователь удален успешно',
            });
        } catch (e) {
            notification.open({
                type: "error",
                message: 'Ошибка удаления пользователя',
            });
        } finally {
            await dispatch(UsersActions.getItems())
        }
    }


    const columns: ColumnsType<TUser> = [
        {
            title: 'Пользователь',
            dataIndex: 'username',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            render: (role, {_id}) => (
                <RoleSwitch role={role} id={_id}/>
            )
        },
        {
            title: 'Действие',
            dataIndex: '_id',
            width: 150,
            render: (value) => <>
                <Button onClick={(e) => {
                    e.stopPropagation()
                    onDelete(value)
                }} shape={'circle'} icon={<DeleteOutlined />} className={'button__circle'} />
            </>
        }
    ];

    useEffect(() => {
        dispatch(UsersActions.getItems())
    }, []) // eslint-disable-line

    return <>
        <div className={'page'}>
            <div className={'page__title'}>
                <Title level={1}>Пользователи</Title>
                <UserOutlined style={{fontSize: '35px'}} />
            </div>
            <div>
                <Table rowKey={'_id'} pagination={{pageSize: 9}} columns={columns} dataSource={data} loading={loading}/>
            </div>
        </div>
        </>
}

export default Users;