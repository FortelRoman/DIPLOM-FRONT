import {Outlet} from "react-router-dom";
import {Layout} from "antd";
import React from "react";
import PageHeader from "../blocks/page-header/page-header";

const { Content } = Layout;

const AuthTemplate = () => {
    return (
        <Layout>
            <PageHeader/>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default AuthTemplate;