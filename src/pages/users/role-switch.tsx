import {notification, Space, Switch} from "antd";
import React, {FC} from "react";
import {TRole} from "../../types/role";
import {UsersActions} from "../../store/users";
import {useAppDispatch} from "../../store/hooks";

type TProps = {
    role: TRole,
    id: string,
}
const RoleSwitch: FC<TProps> = ({id, role}) => {
    const dispatch = useAppDispatch();

    const onUpdateRole = async (id: string, checked: boolean) => {
        try {
            await dispatch(UsersActions.updateRoleItem({id, role: checked ? "ANALYST" : "USER"}))
            notification.open({
                type: "success",
                message: 'Роль изменена успешно',
            });
        } catch (e) {
            notification.open({
                type: "error",
                message: 'Ошибка изменения роли',
            });
        } finally {
            await dispatch(UsersActions.getItems())
        }
    }

    return (
        <Space size={20}>
            Пользователь
            <Switch defaultChecked={role === 'ANALYST'} onChange={(checked) => onUpdateRole(id, checked)} />
            Аналитик
        </Space>
    )
}

export default RoleSwitch;