import {Button, Modal, notification} from "antd";
import React, {FC, useEffect} from "react";
import {useAppDispatch} from "../../store/hooks";
import {useForm} from "react-hook-form";
import {ProfileActions} from "../../store/auth";
import CustomInput from "../../components/CustomInput";
import {CheckCircleOutlined} from "@ant-design/icons";

type Props = {
    isModalOpen: boolean,
    handleCancel: () => void,
}


type TPasswordState = {
    oldPassword: string,
    password: string,
    repeatPassword: string,
}

const defaultValues = {
    oldPassword: '',
    password: '',
    repeatPassword: '',
}

export const EditPasswordModal: FC<Props> = ({isModalOpen, handleCancel}) => {
    const dispatch = useAppDispatch();

    const methods = useForm<TPasswordState>({
        mode: 'onTouched',
        defaultValues,
    });

    const {setError, getValues, trigger, control, handleSubmit, reset, watch, formState: {isValid, isSubmitted}} = methods;

    const onPasswordChange = async (values: TPasswordState) => {
        if (isValid) {
            try {
                const {oldPassword, password} = values;
                await dispatch(ProfileActions.updateProfile({oldPassword, password})).unwrap()
                notification.success({
                    type: "success",
                    message: 'Пароль успешно изменен',
                });
                handleCancel();
                reset(defaultValues)
            } catch (e) {
                console.log(e);
                notification.open({
                    type: "error",
                    message: 'Ошибка изменения пароля',
                });
                setError('oldPassword', { type: 'custom', message: String(e) })
            } finally {
                dispatch(ProfileActions.getProfile());
            }
        }
    }

    useEffect(() => {
        if (getValues('password') && getValues('repeatPassword')) {
            trigger('repeatPassword')
        }
    }, [getValues('password')]) // eslint-disable-line

    return  (
        <Modal title="Изменение пароля" open={isModalOpen} centered onCancel={handleCancel} footer={null}>
            <form onSubmit={handleSubmit(onPasswordChange)}>
                <div className={'login__field'}>
                    <CustomInput
                        name={'oldPassword'}
                        main={{
                            label: 'Текущий пароль',
                            placeholder: 'Введите текущий пароль',
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
                        name={'password'}
                        main={{
                            label: 'Новый пароль',
                            placeholder: 'Введите новый пароль',
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
                            placeholder: 'Повторите новый пароль',
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
                    <Button htmlType={'submit'} disabled={!isSubmitted ? false : !isValid} type={'primary'} icon={<CheckCircleOutlined />}>Сохранить</Button>
                    <Button>Отменить</Button>
                </div>
            </form>
        </Modal>
    )
}