import React from "react";
import {Button, Layout, Tooltip, Typography} from "antd";
import {DingtalkOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';
import './page-header.css'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {ProfileActions, ProfileSelectors} from "../../store/auth";
import {ERole} from "../../types/role";

const {Header} = Layout;
const {Text} = Typography;

const PageHeader = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const username = useAppSelector(ProfileSelectors.username)
    const role = useAppSelector(ProfileSelectors.role)

    const onLogoutClick = () => {
        dispatch(ProfileActions.logout());
        navigate('/auth/login');
    }

    return (
        <Header>
            <div className={'page__header'}>
                <Link to={'/'}>
                    <div className={'logo'}>
                        <DingtalkOutlined />
                        <span className={'logo__text'}>Parse</span>
                    </div>
                </Link>
                {
                    username && (
                        <div className={'profile'}>
                            <div className={'profile__info'}>
                                <Tooltip title={'Перейти к профилю'}>
                                    <Button shape={'circle'} onClick={() => navigate('/profile')}>
                                        <UserOutlined style={{fontSize: '24px'}} />
                                    </Button>
                                </Tooltip>
                                <div>
                                    <Text className={'profile__user'}>{username}</Text>
                                    <Text className={'profile__role'}>{ERole[role]}</Text>
                                </div>
                            </div>
                            <Tooltip title={'Выйти из системы'}>
                                <div>
                                    <Button type='primary' onClick={onLogoutClick} icon={<LogoutOutlined />}/>
                                </div>
                            </Tooltip>
                        </div>
                    )
                }
            </div>
        </Header>
    );
};
export default PageHeader;