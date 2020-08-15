import React from 'react';
import { Container } from 'native-base';
import HomeInfo from '../containers/HomeInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const Home = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader navigation={props.navigation} />
            <HomeInfo navigation={props.navigation} />
            <AppFooter />
        </Container>
    );

}

export default Home;