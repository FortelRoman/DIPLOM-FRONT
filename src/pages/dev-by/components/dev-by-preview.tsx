import ReactJson from "react-json-view";
import React, {FC} from "react";

type TProps = {
    preview?: any[] | null
}
export const DevByPreview: FC<TProps> = ({preview}) => {
    // return <div style={{maxHeight: '800px', overflowY: "auto"}}>
    return <div>
        {
            preview && (
                <ReactJson src={preview} name={false} theme={'grayscale'} displayDataTypes={false}
                           iconStyle={'circle'} collapsed={1} collapseStringsAfterLength={50} groupArraysAfterLength={200}  />
            )
        }
    </div>
}