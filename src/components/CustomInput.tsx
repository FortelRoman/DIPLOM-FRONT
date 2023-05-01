import { Input, InputProps, Typography } from 'antd';
import React, { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

const {Text} = Typography;

export type InputTextProps = {
    main: { label?: string } & InputProps;
};
type Props = InputTextProps & UseControllerProps<any>;
const CustomInput: FC<Props> = ({ main, ...props }) => {
    const { className: classProps, disabled, label, ...rest } = main;
    const {
        field,
        fieldState: { error },
    } = useController(props);

    const errorField = { errorText: error?.message, hasError: error };

    return (
        // <div className={classNames('form-item', { hasError: errorField?.hasError })}>
        <>
            <Text>{label}</Text>
            <Input
                placeholder={main.placeholder}
                status={errorField.hasError ? 'error' : ''}
                disabled={disabled}
                {...rest}
                {...field}
            />
            {
                errorField.errorText && <Text type={'danger'}>{errorField.errorText}</Text>
            }
            </>
    );
};
export default CustomInput;
