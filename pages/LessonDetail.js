import React from 'react';
import { Container } from 'native-base';
import LessonDetailInfo from '../containers/lesson/LessonDetailInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const LessonDetail = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader navigation={props.navigation} />
            <LessonDetailInfo id={props.navigation.getParam('id')} title={props.navigation.getParam('title')} />
            <AppFooter />
        </Container>
    );

}

export default LessonDetail;