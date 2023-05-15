import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form';
import {Button, Spin, Typography} from "antd";
import './login.css'
import CustomInput from "../../components/CustomInput";
import {DingtalkOutlined} from '@ant-design/icons';
import {ProfileActions, ProfileSelectors} from "../../store/auth";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import React, {useEffect} from "react";
import {TRegister} from "../../types/user";

const {Title} = Typography;

type TState = TRegister & {
    repeatPassword: string,
}
const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(ProfileSelectors.isLoading)

    const methods = useForm<TState>({
        mode: 'onTouched',
        defaultValues: {
            username: '',
            login: '',
            password: '',
            repeatPassword: '',
        },
    });
    const {
        handleSubmit,
        formState: { isValid, isSubmitted },
        setFocus,
        control,
        getValues,
        trigger,
        watch,
        setError,
    } = methods;

    useEffect(() => {
        if (getValues('password') && getValues('repeatPassword')) {
            trigger('repeatPassword')
        }
    }, [getValues('password')]) // eslint-disable-line


    const onSubmit = async () => {
        if (isValid) {
            try {
                await dispatch(ProfileActions.register(getValues())).unwrap();
                navigate('/auth/login')
            } catch (e) {
                setError('login', {type: 'custom', message: String(e)})
            }
        } else {
            setFocus('username');
        }
    };

    return (
        <>
            <div className={'login'}>
                <Spin spinning={isLoading}>
                    <div className={'login__content'}>
                        <Title className={'login__title'}>Регистрация в системе</Title>
                        <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={'login__field'}>
                                        <CustomInput
                                            name={'username'}
                                            main={{
                                                label: 'Имя пользователя',
                                                placeholder: 'Введите имя пользователя',
                                            }}
                                            control={control}
                                            rules={{
                                                required: { message: 'Поле обязательное', value: true },
                                            }}
                                        />
                                    </div>
                                    <div className={'login__field'}>
                                        <CustomInput
                                            name={'login'}
                                            main={{
                                                label: 'Логин',
                                                placeholder: 'Введите логин',
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
                                                type: 'password'
                                            }}
                                            control={control}
                                            rules={{
                                                required: { message: 'Поле обязательное', value: true },
                                            }}
                                        />
                                    </div>
                                    <div className={'login__field'}>
                                        <CustomInput
                                            name={'repeatPassword'}
                                            main={{
                                                label: 'Повторите пароль',
                                                placeholder: 'Введите пароль',
                                                type: 'password'
                                            }}
                                            control={control}
                                            rules={{
                                                required: { message: 'Поле обязательное', value: true },
                                                validate: (val: string) => {
                                                    if (watch('password') !== val) {
                                                        return "Пароли не совпадают";
                                                    }
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className={'login__buttons'}>
                                        <Button
                                            type={'primary'}
                                            htmlType={'submit'}
                                            disabled={!isSubmitted ? false : !isValid}
                                        >
                                            Зарегистрироваться
                                        </Button>
                                        <Button type={'link'} onClick={() => navigate('/auth/login')}>
                                            {"Выполнить вход >"}
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

export default RegisterPage;