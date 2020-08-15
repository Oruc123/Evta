import React from 'react';
import { Container } from 'native-base';
import RankInfo from '../containers/rank/RankInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const Rank = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader navigation={props.navigation} />
            <RankInfo />
            <AppFooter />
        </Container>
    );

}

export default Rank;