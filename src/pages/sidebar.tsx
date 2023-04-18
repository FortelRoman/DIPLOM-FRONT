import { useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Menu, MenuProps} from "antd";
import { DatabaseOutlined, UserOutlined } from '@ant-design/icons';


type MenuItem = Required<MenuProps>['items'][number];

const routesMenu: MenuItem[] = [
    {
        key: '/resources',
        label: 'Ресурсы',
        icon: <DatabaseOutlined style={{fontSize: '20px'}} />,
    },
    {
        key: '/users',
        label: 'Пользователи',
        icon: <UserOutlined style={{fontSize: '20px'}} />,
    },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([]);

    console.log('pathname', pathname)

    useEffect(() => {
        //@ts-ignore
        routesMenu.forEach(({key}) => {
            if (key.includes(pathname)) {
                setSelectedKeys(key)
            }
        })
    }, [pathname])


    return (
        <div className={'menu'}>
            <div className={'menu__content'}>
                <Menu
                    selectedKeys={selectedKeys}
                    mode="inline"
                    //@ts-ignore
                    items={routesMenu}
                    onClick={({key}) => navigate(key)}
                />
            </div>
        </div>
    );
};
export default Sidebar;