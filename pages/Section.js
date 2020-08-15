import React from 'react';
import { Container } from 'native-base';
import SectionInfo from '../containers/section/SectionInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const Section = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader navigation={props.navigation} />
            <SectionInfo navigation={props.navigation} id={props.navigation.getParam('id')} parts={props.navigation.getParam('parts')} page_title={props.navigation.getParam('page_title')} title={props.navigation.getParam('title')} from_page={props.navigation.getParam('from_page')} />
            <AppFooter />
        </Container>
    );

}

export default Section;