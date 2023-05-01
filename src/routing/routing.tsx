import {RouteObject, useRoutes} from "react-router-dom";
import Template from "../pages/template";
import {useMemo} from "react";
import ResourcesList from "../pages/resource/resources-list/resources-list";
import ResourcesItem from "../pages/resource/resources-item/resources-item";
import Resources from "../pages/resource/resources";
import Users from "../pages/users/users";
import LoginPage from "../pages/auth/login";
import AuthTemplate from "../pages/auth-template";
import RegisterPage from "../pages/auth/register";

type TRoute = {} & RouteObject

const routes: TRoute[] = [
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
        element: <Users/>,
    },
]

const Routing = () => {
    const validateRoutes = useMemo(() => {
        return [
            {
                path: '/',
                element: <Template />,
                children: [
                    ...routes,
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
                ],
            }
            // { path: '*', element: <Redirect path={''} /> },
        ];
    }, []);

    return useRoutes(validateRoutes);

};
export default Routing;