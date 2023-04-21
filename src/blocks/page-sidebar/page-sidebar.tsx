import { useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Menu, MenuProps, Layout} from "antd";
import { DatabaseOutlined, UserOutlined } from '@ant-design/icons';
import './page-sidebar.css'

const {Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const routesMenu: MenuItem[] = [
    {
        key: '/resources',
        label: 'Ресурсы',
        icon: <DatabaseOutlined style={{fontSize: '25px'}} />,
    },
    {
        key: '/resources/dev-by',
        label: 'Вакансии',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" viewBox="0 0 140 60">
            <path d="M100.6 14.2c-5-2.6-7.9.7-9.1 2.6-3 5.6-7.1 12-7.1 12h-.1s-4.3-9.3-5.3-11.2c-1.8-3.1-4.6-3.4-6.7-2.9-3.8.9-4.6 4.7-4.7 5.4-2.5 5.3-9.3 14-16 14v-.1c2.5-1.7 6.9-6.5 6.9-12.1 0-5.5-3.8-9.1-9.2-9.1-10 0-11.8 12.1-11.8 14.3-4.9 4.9-12 7.8-18 7.8-3.7 0-5.6-2.1-5.6-4.4 0-4 4.3-4.9 6.7-4.1.7.4 3 2.1 5.8 2.1 2.9 0 6.2-2.1 6.2-5.4 0 0 .1-15.8.1-17.8 0-3-3-5.4-6.7-5.4-3.6 0-6.4 2.4-6.4 5.4l.4 11.4c-5.6-1.6-20-.1-20 12.8 0 11.4 11 16.5 20.8 16.5 10.5 0 19.7-4.6 21.4-5.5 1.1 1.3 5 4.7 11.4 4.7 10.6 0 18.8-9.5 20.6-12h.1s3.6 6.5 4.4 7.8c1.5 2.6 3.8 3.9 6.3 3.9 2.6 0 4.9-1.2 6.4-3.4 0 0 9-13.3 11.9-18.8 1.7-3.1.7-6.8-2.7-8.5zm10.3 13.3c-4.8 0-8.6 3.8-8.6 8.6 0 4.7 3.8 8.5 8.6 8.5s8.6-3.8 8.6-8.5c0-4.8-3.8-8.6-8.6-8.6z"/>
        </svg>,
    },
    {
        key: '/users',
        label: 'Пользователи',
        icon: <UserOutlined style={{fontSize: '25px'}} />,
    },
];

const PageSidebar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        setSelectedKeys([])
        //@ts-ignore
        routesMenu.forEach(({key}) => {
            if (pathname.includes(key)) {
                //@ts-ignore
                setSelectedKeys((prev) => ([...prev, key]))
            }
        })
    }, [pathname])


    return (
        <Sider collapsible width={250} collapsedWidth={100} >
            <div className={'menu'}>
                <Menu
                    selectedKeys={selectedKeys}
                    defaultOpenKeys={['/resources']}
                    mode="inline"
                    //@ts-ignore
                    items={routesMenu}
                    onClick={({key}) => navigate(key)}
                />
            </div>
        </Sider>
    );
};
export default PageSidebar;