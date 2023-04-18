import {RouteObject, useRoutes} from "react-router-dom";
import Template from "../pages/template";
import {useMemo} from "react";
import DevByList from "../pages/dev-by/dev-by-list";
import DevByItem from "../pages/dev-by/dev-by-item";
import Resources from "../pages/resources";

type TRoute = {} & RouteObject

const routes: TRoute[] = [
    {
        path: '/resources',
        element: <Resources/>,
    },
    {
        path: '/resources/dev-by',
        element: <DevByList />,
    },
    {
        path: '/resources/dev-by/:id',
        element: <DevByItem />,
    },
    {
        path: '/users',
        element: <div>Users page</div>,
    }
]

const Routing = () => {
    const validateRoutes = useMemo(() => {
        return [
            {
                path: '/',
                element: <Template />,
                children: [
                    ...routes
                ],
            },
            // { path: '*', element: <Redirect path={''} /> },
        ];
    }, []);

    return useRoutes(validateRoutes);

};
export default Routing;