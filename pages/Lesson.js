import React from 'react';
import { Container } from 'native-base';
import LessonInfo from '../containers/lesson/LessonInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const Lesson = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader navigation={props.navigation} />
            <LessonInfo navigation={props.navigation} />
            <AppFooter />
        </Container>
    );

}

export default Lesson;