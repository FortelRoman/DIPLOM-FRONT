import {ProfileActions, ProfileSelectors} from "../../store/auth";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {Button, notification, Space, Spin, Typography} from "antd";
import {UserOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {ERole} from "../../types/role";
import './profile.css'
import CustomInput from "../../components/CustomInput";
import {useForm} from "react-hook-form";
import {EditPasswordModal} from "./edit-password-modal";
const {Title} = Typography;

type TEditState = {
    username: boolean,
    login: boolean,
    password: boolean,
}

type TUsernameState = {
    username: string,
}

type TLoginState = {
    login: string,
}

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const {role, username, login} = useAppSelector(ProfileSelectors.profile)
    const isLoading = useAppSelector(ProfileSelectors.isLoading)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [edit, setEdit] = useState<TEditState>({
        username: false,
        login: false,
        password: false,
    });

    const onEdit = (field: keyof TEditState) => {
        setEdit((prev) => ({...prev, [field]: !prev[field]}))
    }

    const onDelete = () => {

    }

    const usernameMethods = useForm<TUsernameState>({
        mode: 'onTouched',
        defaultValues: {
            username: '',
        },
    });
    const loginMethods = useForm<TLoginState>({
        mode: 'onTouched',
        defaultValues: {
            login: '',
        },
    });

    const onUsernameChange = async () => {
        try {
            setEdit((prev) => ({...prev, username: false}))
            await dispatch(ProfileActions.updateProfile(usernameMethods.getValues())).unwrap()
            notification.success({
                type: "success",
                message: 'Имя пользователя успешно изменено',
            });
        } catch (e) {
            notification.open({
                type: "error",
                message: 'Ошибка изменения имени пользователя',
            });
        } finally {
            dispatch(ProfileActions.getProfile());
        }
    }

    const onLoginChange = async () => {
        try {
            loginMethods.clearErrors();
            await dispatch(ProfileActions.updateProfile(loginMethods.getValues())).unwrap()
            notification.success({
                type: "success",
                message: 'Логин успешно изменен',
            });
            setEdit((prev) => ({...prev, login: false}))
        } catch (e) {
            console.log(e);
            notification.open({
                type: "error",
                message: 'Ошибка изменения логина',
            });
            loginMethods.setError('login', { type: 'custom', message: String(e) })
        } finally {
            dispatch(ProfileActions.getProfile());
        }
    }

    useEffect(() => {
        usernameMethods.reset({username})
    }, [username]) // eslint-disable-line

    useEffect(() => {
        loginMethods.reset({login})
    }, [login]) // eslint-disable-line

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <div className={'page'}>
        <div className={'page__title'}>
            <Title level={1}>Профиль</Title>
            <UserOutlined style={{fontSize: '35px'}} />
        </div>
        <Spin spinning={isLoading}>
            <div className={'profile-buttons'}>
                <div className={'profile-field'}>
                    <div className={'profile-field__title'}>Роль в систем</div>
                    <div className={'profile-field__text'}>{ERole[role] || '—'}</div>
                </div>
                <Button onClick={() => setIsModalOpen(true)} type={'primary'} icon={<EditOutlined />}>Изменить пароль</Button>
                <Button onClick={onDelete} icon={<DeleteOutlined />}>Удалить аккаунт</Button>
            </div>
            <div className={'profile-fields'}>
                <div className={'profile-field'}>
                    <Space>
                        <div className={'profile-field__title'}>Имя пользователя</div>
                        <Button onClick={() => onEdit('username')} className={'profile-field__edit'} type={'ghost'}><EditOutlined /></Button>
                    </Space>
                    {
                        edit.username ?  <div className={'profile-field__input'}>
                            <div className={'profile-field__control'}>
                                <CustomInput
                                    name={'username'}
                                    main={{
                                        label: '',
                                        placeholder: 'Введите имя пользователя',
                                        autoComplete: 'off',
                                    }}
                                    control={usernameMethods.control}
                                    rules={{
                                        required: { message: 'Поле обязательное', value: true },
                                    }}
                                />
                            </div>
                            <Button disabled={!usernameMethods.formState.isValid} onClick={onUsernameChange} className={'profile-field__save'} type={'primary'} icon={<CheckCircleOutlined />}></Button>
                        </div>: <div className={'profile-field__text'}>{username || '—'}</div>
                    }
                </div>
                <div className={'profile-field'}>
                    <Space>
                        <div className={'profile-field__title'}>Логин</div>
                        <Button onClick={() => onEdit('login')} className={'profile-field__edit'} type={'ghost'}><EditOutlined /></Button>
                    </Space>
                    {
                        edit.login ?  <div className={'profile-field__input'}>
                            <div className={'profile-field__control'}>
                                <CustomInput
                                    name={'login'}
                                    main={{
                                        label: '',
                                        placeholder: 'Введите логин',
                                        autoComplete: 'off',
                                    }}
                                    control={loginMethods.control}
                                    rules={{
                                        required: { message: 'Поле обязательное', value: true },
                                    }}
                                />
                            </div>
                            <Button disabled={!loginMethods.formState.isValid} onClick={onLoginChange} className={'profile-field__save'} type={'primary'} icon={<CheckCircleOutlined />}></Button>
                        </div>: <div className={'profile-field__text'}>{login || '—'}</div>
                    }
                </div>
            </div>
        </Spin>
        {
            isModalOpen && <EditPasswordModal isModalOpen={isModalOpen} handleCancel={handleCancel}/>
        }
    </div>
}

export default ProfilePage;