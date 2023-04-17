import {Outlet} from "react-router-dom";
import Sidebar from "./sidebar";


const Template = () => {
    return (
        <div className={'template'}>
            <Sidebar />
            <div className={'content'}>
                <Outlet />
            </div>
        </div>
    );
}

export default Template;