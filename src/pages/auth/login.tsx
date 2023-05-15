import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form';
import {Button, Spin, Typography} from "antd";
import './login.css'
import CustomInput from "../../components/CustomInput";
import {DingtalkOutlined} from '@ant-design/icons';
import {ProfileActions, ProfileSelectors} from "../../store/auth";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import React from "react";
import {TLogin} from "../../types/user";

const {Title} = Typography;

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(ProfileSelectors.isLoading)

    const methods = useForm<TLogin>({
        mode: 'onTouched',
        defaultValues: {
            login: '',
            password: '',
        },
    });
    const {
        handleSubmit,
        formState: { isValid, isSubmitted },
        setFocus,
        control,
        getValues,
        setError,
    } = methods;


    const onSubmit = async () => {
        if (isValid) {
            try {
                await dispatch(ProfileActions.login(getValues())).unwrap();
                navigate('/resources')
            } catch (e) {
                setError('password', {type: 'custom', message: String(e)})
            }
        } else {
            setFocus('login');
        }
    };

    return (
        <>
            <div className={'login'}>
                <Spin spinning={isLoading}>
                    <div className={'login__content'}>
                        <Title className={'login__title'}>Вход в систему</Title>
                        <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={'login__field'}>
                                        <CustomInput
                                            name={'login'}
                                            main={{
                                                label: 'Логин',
                                                placeholder: 'Введите логин',
                                                autoComplete: 'off',
                                            }}
                                            control={control}
                                            rules={{
                                                required: { message: 'Поле обязательное', value: true },
                                            }}
                                        />
                                    </div>
                                    <div className={'login__field'}>
                                        <CustomInput
                                            name={'password'}
                                            main={{
                                                label: 'Пароль',
                                                placeholder: 'Введите пароль',
                                                type: 'password',
                                                autoComplete: 'off',
                                            }}
                                            control={control}
                                            rules={{
                                                required: { message: 'Поле обязательное', value: true },
                                            }}
                                        />
                                    </div>
                                    <div className={'login__buttons'}>
                                        <Button
                                            type={'primary'}
                                            htmlType={'submit'}
                                            disabled={!isSubmitted ? false : !isValid}
                                        >
                                            Войти
                                        </Button>
                                        <Button type={'link'} onClick={() => navigate('/auth/registration')}>
                                            {"Зарегистрироваться >"}
                                        </Button>
                                    </div>
                                    <DingtalkOutlined style={{fontSize: '500px'}} className={'login__bg--left'}/>
                                    <DingtalkOutlined style={{fontSize: '500px'}} className={'login__bg--right'}/>
                                </form>
                        </FormProvider>
                    </div>
                </Spin>
            </div>
        </>
    );

}

export default LoginPage;