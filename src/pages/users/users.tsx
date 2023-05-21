import {Button, Col, notification, Row, Spin, Table, Tooltip, Typography} from "antd";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import React, {useEffect} from "react";
import {ColumnsType} from "antd/es/table";
import {TUser} from "../../types/user";
import {UsersActions, UsersSelectors} from "../../store/users";
import {DeleteOutlined, UserOutlined} from "@ant-design/icons";
import RoleSwitch from "./role-switch";
import './users.css'
const {Title, Text} = Typography;

const Users = () => {
    const dispatch = useAppDispatch();

    const {adminCount, analystCount, usersCount, totalCount, users} = useAppSelector(UsersSelectors.data)
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
                <Tooltip title={'Удалить'}>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete(value)
                        }}
                        shape={'circle'}
                        icon={<DeleteOutlined />}
                        className={'button__circle'}
                    />
                </Tooltip>
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
            <Row gutter={48}>
                <Col flex={'330px'}>
                    <Spin spinning={loading}>
                        <div className={'users__role--black'}>
                            <div>
                                <Text className={'users__label'}>Все роли</Text>
                                <Title className={'users__title'} level={4}>Все пользователи</Title>
                            </div>
                            <Text className={'users__count'}>{totalCount}</Text>
                        </div>
                        <div className={'users__role'}>
                            <div>
                                <Text className={'users__label'}>Роль:</Text>
                                <Title className={'users__title'} level={4}>Администратор</Title>
                            </div>
                            <Text className={'users__count'}>{adminCount ?? '—'}</Text>
                        </div>
                        <div className={'users__role'}>
                            <div>
                                <Text className={'users__label'}>Роль:</Text>
                                <Title className={'users__title'} level={4}>Аналитик</Title>
                            </div>
                            <Text className={'users__count'}>{analystCount ?? '—'}</Text>
                        </div>
                        <div className={'users__role'}>
                            <div>
                                <Text className={'users__label'}>Роль:</Text>
                                <Title className={'users__title'} level={4}>Пользователь</Title>
                            </div>
                            <Text className={'users__count'}>{usersCount ?? '—'}</Text>
                        </div>
                    </Spin>
                </Col>
                <Col flex={'auto'}>
                    <Table rowKey={'_id'} pagination={{pageSize: 9}} columns={columns} dataSource={users?.filter(({role}) => role !== 'ADMIN')} loading={loading}/>
                </Col>
            </Row>
        </div>
        </>
}

export default Users;