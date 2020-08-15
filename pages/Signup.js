import React from 'react';
import { Content } from 'native-base';
import SignupInfo from '../containers/auth/SignupInfo';

const Signup = () => {

    return (
        <Content style={{ backgroundColor: "#F5F6F8" }}>
            <SignupInfo />
        </Content>
    );

}

export default Signup;