import React from 'react';
import { Content } from 'native-base';
import ForgetPswInfo from '../containers/auth/ForgetPswInfo';

const ForgetPsw = (props) => {

    return (
        <Content style={{ backgroundColor: "#F5F6F8" }}>
            <ForgetPswInfo navigation={props.navigation} />
        </Content>
    );

}

export default ForgetPsw;