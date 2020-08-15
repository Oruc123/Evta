import React from 'react';
import { Container } from 'native-base';
import CourseInfo from '../containers/course/CourseInfo';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';

const Course = (props) => {

    return (
        <Container style={{ backgroundColor: '#f8f8f8' }}>
            <AppHeader navigation={props.navigation} type={"settings"} backTo={"Home"} title={props.navigation.getParam('title')} />
            <CourseInfo id={props.navigation.getParam('id')} />
            <AppFooter />
        </Container>
    );

}

export default Course;