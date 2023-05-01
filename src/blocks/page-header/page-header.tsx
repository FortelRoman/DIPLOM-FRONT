import React from "react";
import {Button, Layout, Space, Typography} from "antd";
import {DingtalkOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';
import './page-header.css'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {ProfileActions, ProfileSelectors} from "../../store/auth";

const {Header} = Layout;
const {Text} = Typography;

const PageHeader = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const username = useAppSelector(ProfileSelectors.username)
    const isAdmin = useAppSelector(ProfileSelectors.isAdmin)

    // const getProfile = async () => {
    //     try {
    //         await dispatch(ProfileActions.getProfile()).unwrap()
    //     } catch (e) {
    //         navigate('/auth/login');
    //     }
    // }

    const onLogoutClick = () => {
        dispatch(ProfileActions.logout());
        navigate('/auth/login');
    }

    return (
        <Header>
            <div className={'page__header'}>
                <div className={'logo'}>
                    <DingtalkOutlined />
                    <span className={'logo__text'}>Parse</span>
                </div>
                {
                    username && (
                        <div className={'profile'}>
                            <Space>
                                <Text>{username}</Text>
                                <UserOutlined style={{fontSize: '24px'}} />
                                <Text>{isAdmin ? 'Администратор' : 'Аналитик'}</Text>
                            </Space>
                            <Button type='primary' shape={'circle'} onClick={onLogoutClick}>
                                <LogoutOutlined style={{fontSize: '24px'}} />
                            </Button>
                        </div>
                    )
                }
            </div>
        </Header>
    );
};
export default PageHeader;