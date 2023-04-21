import {RouteObject, useRoutes} from "react-router-dom";
import Template from "../pages/template";
import {useMemo} from "react";
import ResourcesList from "../pages/resource/resources-list/resources-list";
import ResourcesItem from "../pages/resource/resources-item/resources-item";
import Resources from "../pages/resource/resources";

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