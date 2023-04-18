import {Outlet} from "react-router-dom";
import Sidebar from "./sidebar";
import {Layout} from "antd";
import {DingtalkOutlined} from "@ant-design/icons";
import React from "react";

const { Header, Content, Sider } = Layout;

const Template = () => {
    return (
        <Layout>
            <Header>
                 <div className={'logo'}>
                     <DingtalkOutlined />
                     <span className={'logo__text'}>Parse</span>
                 </div>
            </Header>
            <Layout hasSider>
                <Sider collapsible><Sidebar /></Sider>
                <Layout>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Template;