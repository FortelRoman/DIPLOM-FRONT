import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/date.css';
import './styles/button.css';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import Routing from "./routing/routing";
import {ConfigProvider, ThemeConfig} from "antd";
import ruRu from 'antd/locale/ru_RU';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export enum Colors {
    'baseColor' = '#fff',

    'blue' = '#0061D9',
    'darkBlue' = '#0050B2',

    'green' = '#84BD00',
    'greenYellow' = '#D0F053',

    'coral' = '#FF2E56',
    'lightOrange' = '#FFC700',

    'dark1' = '#000000',
    'dark2' = '#333333',

    'gray1' = '#76767A',
    'gray2' = '#A7A7AB',
    'gray3' = '#D9D9DE',
    'gray4' = '#F5F5F5',
    'gray5' = '#F0F0F0',
}


const theme: ThemeConfig = {
    token: {
        colorPrimary: Colors.dark1,
        colorPrimaryHover: Colors.dark2,
        // colorError: Colors.coral,
        colorWarning: Colors.lightOrange,
        colorSuccess: Colors.greenYellow,
        colorInfo: Colors.dark2,
    },
    components: {
        // Checkbox: {
        //     colorPrimary: Colors.green,
        //     colorPrimaryHover: Colors.green,
        // },
        // Pagination: {
        //     colorPrimary: Colors.dark1,
        //     colorPrimaryHover: Colors.dark1,
        //     lineWidth: 0,
        //     colorBgContainer: Colors.greenYellow,
        // },
        Input: {
            colorPrimaryHover: Colors.dark2,
            // colorBgContainer: Colors.gray4,
            colorBgContainerDisabled: Colors.gray5,
            // colorBorder: 'transparent',
            borderRadius: 8,
            fontSize: 16,
            controlHeight: 48,
        },
        // Radio: {
        //     colorPrimary: Colors.green,
        //     colorPrimaryHover: Colors.green,
        // },
        // TreeSelect: {
        //     colorPrimary: Colors.green,
        //     colorPrimaryHover: Colors.green,
        // },
        DatePicker: {
            fontSize: 16,
            colorBgContainer: Colors.gray4,
            colorBorder: 'transparent',
            colorPrimaryHover: Colors.dark2,
        },
        Button: {
            fontSize: 16,
        },
        // Select: {
        //     fontSize: 16,
        //     colorBgContainer: Colors.gray4,
        //     colorBorder: 'transparent',
        //     colorPrimaryHover: Colors.dark2,
        //     controlHeight: 48,
        // },
        // Switch: {
        //     colorPrimary: Colors.greenYellow,
        //     colorPrimaryHover: Colors.greenYellow,
        // },
    },
};


root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <ConfigProvider theme={theme} locale={ruRu}>
                <Routing/>
              </ConfigProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
