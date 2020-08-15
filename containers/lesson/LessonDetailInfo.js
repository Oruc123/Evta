import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { View, Content, Title, Left, Body, Right, Icon, Toast } from 'native-base';
import LessonCard from './LessonCard';
import NavigationService from '../../components/navigation/NavigationService';
import Loading from '../../components/basic/Loading';
import { URL } from '../../components/basic/url';
import { deviceLanguage } from '../../components/basic/device-language';
import axios from 'axios';
import showToast from '../../helper/ToastAlert';
var ls = require('react-native-local-storage');

export default class LessonDetailInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: '',
            course_info: [],
            lang: '1',
            translations: []
        }
    }

    async componentDidMount() {

        let token = await ls.get('token');
        let account = await ls.get('account');
        let kid_id = await ls.get('kid_id');

        let jsonObj = {
            token: token,
            account: account,
            profile: kid_id,
            course: this.props.id
        }

        let kid_lang = await ls.get('kid_lang');
        let translations = await ls.get('translations');
        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        } else if (kid_lang === null && deviceLanguage === 'ru_RU') {
            this.setState({ lang: '3' });
        }
        this.setState({ translations: translations });
        this.getCourseInfo(jsonObj);
    }

    getCourseInfo = (jsonObj) => {
        this.setState({ isLoading: true })
        axios.post(URL + 'api/course/course', jsonObj)
            .then(result => this.setState({
                isLoading: false,
                course_info: result.data.result
            }))
            .catch(error => this.setState({
                isLoading: true,
                error: error
            }, () => showToast("Sistem xətası", "danger")));
    }

    course_date = (text) => {
        Toast.show({
            text: text,
            buttonText: "Bağla",
            duration: 3000,
            position: "top",
            style: {
                marginTop: StatusBar.currentHeight
            }
        });
    }

    render() {

        const { isLoading, course_info, lang, translations } = this.state
        if (isLoading && course_info.length !== 0) {
            return (
                <Loading />
            );
        }
        return (
            <Content style={{ backgroundColor: "#F5F6F8" }} contentContainerStyle={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flexGrow: 1 }}>
                        <View style={[styles.view, { backgroundColor: '#0083E8', marginTop: 20 }]}>
                            <TouchableWithoutFeedback onPress={() => NavigationService.navigate('Lesson')}>
                                <Left style={{ flex: 0.3 }}>
                                    <Icon name="ios-arrow-back" style={[styles.icon, { paddingLeft: 15 }]} />
                                </Left>
                            </TouchableWithoutFeedback>
                            <Body style={{ flex: 1.3 }}>
                                <Title style={styles.title}>{this.props.title}</Title>
                            </Body>
                            <Right style={{ flex: 0.3 }}></Right>
                        </View>
                        {(typeof course_info.chapters !== 'undefined') ?
                            (
                                Object.keys(course_info.chapters).map((key, index) =>
                                    <View key={key}>
                                        {
                                            (course_info.chapters[key].active === '1') ?
                                                (
                                                    (course_info.chapters[key].payment_expired === '1') ?
                                                        (
                                                            <View key={key} style={[styles.view, { backgroundColor: '#0083E8' }]}>
                                                                <Left style={{ flex: 1.3 }}>
                                                                    <Title style={[styles.title, { paddingLeft: 15 }]}>{course_info.chapters[key].title[lang]}</Title>
                                                                </Left>
                                                                <Body style={{ flex: 0.3 }}></Body>
                                                                <Right style={{ flex: 0.3 }}>
                                                                    <Icon name="ios-close-circle-outline" style={[styles.icon, { paddingRight: 15 }]} />
                                                                </Right>
                                                            </View>
                                                        ) :
                                                        (
                                                            <LessonCard key={course_info.chapters[key].id} location={'Section'} margin_top={10} margin_bottom={10}
                                                                id={course_info.chapters[key].id} parts={course_info.chapters[key].part}
                                                                page_title={this.props.title} title={course_info.chapters[key].title[lang]}
                                                                profile_point={course_info.chapters[key].profile_point}
                                                                point={course_info.chapters[key].point}
                                                                progress={course_info.chapters[key].progress}
                                                                from_page={'lesson_detail_info'} />
                                                        )
                                                )
                                                : (
                                                    <TouchableWithoutFeedback onPress={() => this.course_date((typeof translations[lang] !== 'undefined') ? (translations[lang]['Kurs {date} tarixindən sonra aktiv olacaq'].replace('{date}', course_info.chapters[key].activation_period)) : (''))}>
                                                        <View key={key} style={[styles.view, { backgroundColor: '#0083E850' }]}>
                                                            <Left style={{ flex: 1.3 }}>
                                                                <Title style={[styles.title, { paddingLeft: 15 }]}>{course_info.chapters[key].title[lang]}</Title>
                                                            </Left>
                                                            <Body style={{ flex: 0.3 }}></Body>
                                                            <Right style={{ flex: 0.3 }}>
                                                                <Icon name="md-lock" style={[styles.icon, { paddingRight: 15 }]} />
                                                            </Right>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                        }
                                    </View>
                                )
                            )
                            : (<View></View>)}
                    </ScrollView>
                </View>
            </Content>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 15,
        flexDirection: 'row'
    },
    icon: {
        color: '#fff'
    },
    title: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15
    }
});