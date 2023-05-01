import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form';
import {Button, Spin, Typography} from "antd";
import './login.css'
import CustomInput from "../../components/CustomInput";
import {DingtalkOutlined} from '@ant-design/icons';
import {ProfileActions, ProfileSelectors} from "../../store/auth";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import React from "react";

const {Title} = Typography;

type TState = {
    username: string,
    password: string,
}
const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // const error = useAppSelector(ProfileSelectors.error)
    const isLoading = useAppSelector(ProfileSelectors.isLoading)

    const methods = useForm<TState>({
        mode: 'onTouched',
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const {
        handleSubmit,
        formState: { isValid, isSubmitted },
        setFocus,
        control,
        getValues
    } = methods;


    const onSubmit = async () => {
        if (isValid) {
            await dispatch(ProfileActions.login({username: getValues('username'), password: getValues('password')})).unwrap();
            navigate('/resources')

        } else {
            setFocus('username');
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
                                    {/*<Text type={'danger'}>{error}</Text>*/}
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