import React from 'react';
import { Container } from 'native-base';
import AccountInfo from '../containers/account/AccountInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const Account = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader type={"account"} navigation={props.navigation} />
            <AccountInfo navigation={props.navigation} />
            <AppFooter />
        </Container>
    );

}

export default Account;