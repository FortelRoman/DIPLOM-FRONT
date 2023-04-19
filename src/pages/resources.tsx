import {Link} from "react-router-dom";
import {Typography} from "antd";
import DevByIcon from "../icons/dev-by-icon";
import React from "react";

const {Title, Text} = Typography;

const Resources = () => {

    return (
        <div className={'page'}>
            <Title level={1}>Ресурсы</Title>
            <div className={'resources'}>
                <Link to={'/resources/dev-by'}>
                    <div className={'resources__card'}>
                        <Text>Вакансии devby.io</Text>
                        <DevByIcon />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Resources;