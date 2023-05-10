import { useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import {Menu, MenuProps, Layout} from "antd";
import { ReadOutlined, UsergroupAddOutlined, SettingOutlined, ContactsOutlined } from '@ant-design/icons';
import './page-sidebar.css'
import {useAppSelector} from "../../store/hooks";
import { ProfileSelectors } from "../../store/auth";

const {Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const PageSidebar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const role = useAppSelector(ProfileSelectors.role)
    const [selectedKeys, setSelectedKeys] = useState([]);

    const routesMenu: MenuItem[] = useMemo(() => {
        const routes: MenuItem[] = [
            {
                key: '/resources',
                label: 'Ресурсы',
                icon: <ReadOutlined style={{fontSize: '25px'}} />,
            },
            {
                key: '/resources/dev-by',
                label: '—  Вакансии devby',
                icon: <ContactsOutlined style={{fontSize: '25px'}}/>,
            },
        ];

        if (role === 'ADMIN') {
            routes.push({
                key: '/users',
                label: 'Пользователи',
                icon: <UsergroupAddOutlined style={{fontSize: '25px'}} />,
            })
        }

        routes.push( {
            key: '/profile',
            label: 'Профиль',
            icon: <SettingOutlined style={{fontSize: '25px'}} />,
        },)

        return routes;
    }, [role])


    useEffect(() => {
        setSelectedKeys([])
        //@ts-ignore
        routesMenu.forEach(({key}) => {
            if (pathname.includes(key)) {
                //@ts-ignore
                setSelectedKeys((prev) => ([...prev, key]))
            }
        })
    }, [pathname, routesMenu])


    return (
        <Sider collapsible width={300} collapsedWidth={100} >
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