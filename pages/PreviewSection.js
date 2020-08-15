import React from 'react';
import { Container } from 'native-base';
import PreviewSectionInfo from '../containers/section/PreviewSectionInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const PreviewSection = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader navigation={props.navigation} />
            <PreviewSectionInfo navigation={props.navigation} id={props.navigation.getParam('id')} parts={props.navigation.getParam('parts')} page_title={props.navigation.getParam('page_title')} title={props.navigation.getParam('title')} from_page={props.navigation.getParam('from_page')} page={props.navigation.getParam('page')} />
            <AppFooter />
        </Container>
    );

}

export default PreviewSection;