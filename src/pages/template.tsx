import {Outlet} from "react-router-dom";
import {Layout} from "antd";
import React, {useEffect} from "react";
import PageHeader from "../blocks/page-header/page-header";
import PageSidebar from "../blocks/page-sidebar/page-sidebar";
import {useAppDispatch} from "../store/hooks";
import {ProfileActions} from "../store/auth";

const { Content } = Layout;

const Template = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(ProfileActions.getProfile())
    }, []) // eslint-disable-line

    return (
        <Layout>
           <PageHeader/>
            <Layout hasSider>
                <PageSidebar />
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