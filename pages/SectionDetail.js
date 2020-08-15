import React from 'react';
import { Container } from 'native-base';
import SectionDetailInfo from '../containers/section/SectionDetailInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const SectionDetail = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader navigation={props.navigation} />
            <SectionDetailInfo navigation={props.navigation} exercise={props.navigation.getParam('exercise')} page_title={props.navigation.getParam('page_title')} section_title={props.navigation.getParam('section_title')} from_page={props.navigation.getParam('from_page')} title={props.navigation.getParam('title')} />
            <AppFooter />
        </Container>
    );

}

export default SectionDetail;