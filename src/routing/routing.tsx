import {Navigate, useRoutes} from "react-router-dom";
import Template from "../pages/template";
import React, {useMemo} from "react";
import ResourcesList from "../pages/resource/resources-list/resources-list";
import ResourcesItem from "../pages/resource/resources-item/resources-item";
import Resources from "../pages/resource/resources";
import Users from "../pages/users/users";
import LoginPage from "../pages/auth/login";
import AuthTemplate from "../pages/auth-template";
import RegisterPage from "../pages/auth/register";
import ForbiddenPage from "../pages/errors/forbidden-page";
import NotFoundPage from "../pages/errors/not-found-page";
import Profile from "../pages/profile/profile";

const Routing = () => {
    const validateRoutes = useMemo(() => {
        return [
            {
                path: '/',
                element: <Template />,
                children: [
                    {
                        path: '/resources',
                        element: <Resources/>,
                    },
                    {
                        path: '/resources/dev-by',
                        element: <ResourcesList />,
                    },
                    {
                        path: '/resources/dev-by/:id',
                        element: <ResourcesItem />,
                    },
                    {
                        path: '/users',
                        element:  <Users/>,
                    },
                    {
                        path: '/profile',
                        element:  <Profile/>,
                    },
                ],
            },
            {
                path: 'auth',
                element: <AuthTemplate />,
                children: [
                    {
                        path: '/auth/login',
                        element: <LoginPage />,
                    },
                    {
                        path: '/auth/registration',
                        element: <RegisterPage />,
                    },
                    {
                        path: '/auth/forbidden',
                        element:  <ForbiddenPage/>,
                    },
                    {
                        path: '/auth/not-found',
                        element:  <NotFoundPage/>,
                    },
                ],
            },
            { path: '*', element: <Navigate to={'/auth/not-found'} /> },
        ];
    }, []);

    return useRoutes(validateRoutes);

};
export default Routing;