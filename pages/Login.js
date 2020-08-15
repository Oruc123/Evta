import React from 'react';
import { Content } from 'native-base';
import LoginInfo from '../containers/auth/LoginInfo';

const Login = () => {

    return (
        <Content style={{ backgroundColor: "#F5F6F8" }} contentContainerStyle={{ flex: 1 }}>
            <LoginInfo />
        </Content>
    );

}

export default Login;