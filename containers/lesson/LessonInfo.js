import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Content, Title, Left, Body, Right, Icon } from 'native-base';
import ContinueInfo from '../../components/theme/ContinueInfo';
import LessonCard from './LessonCard';
import Loading from '../../components/basic/Loading';
import { URL } from '../../components/basic/url';
import axios from 'axios';
import NavigationService from '../../components/navigation/NavigationService';
import showToast from '../../helper/ToastAlert';
import Empty from '../../components/basic/Empty';
import Orientation from 'react-native-orientation';
var ls = require('react-native-local-storage');

export default class LessonInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: '',
            courses: [],
            lang: '1',
            is_empty: false
        }
        this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
            this._bootstrapAsync();
        });
    }

    _bootstrapAsync = async () => {

        Orientation.lockToPortrait();

        let token = await ls.get('token');
        let account = await ls.get('account');
        let kid_id = await ls.get('kid_id');
        let kid_lang = await ls.get('kid_lang');

        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        }

        let jsonObj = {
            token: token,
            account: account,
            profile: kid_id
        }

        this.getCourses(jsonObj);

    }

    getCourses = (jsonObj) => {
        axios.post(URL + 'api/course/list', jsonObj)
            .then(result => {
                if (result.data.result.length === 0) {
                    this.setState({ is_empty: true });
                } else {
                    this.setState({
                        courses: result.data.result
                    })
                }
            })
            .catch(error => this.setState({
                error: error
            }, () => showToast("Sistem xətası", "danger")));
    }

    render() {

        const { courses, lang, loaded, is_empty } = this.state;

        if (loaded) {

            if (is_empty) {
                return (
                    <Empty />
                );
            }
            return (
                <Content style={{ backgroundColor: "#F5F6F8" }} contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flexGrow: 1 }}>
                            {
                                Object.keys(courses).map((key, index) =>
                                    (courses[key].payment_expired === '1') ?
                                        (
                                            <View style={[styles.view, { marginTop: 10, marginBottom: 10 }]}>
                                                <Left style={{ flex: 1.3 }}>
                                                    <Title style={[styles.title, { paddingLeft: 15 }]}>{courses[key].title[lang]}</Title>
                                                </Left>
                                                <Body style={{ flex: 0.3 }}></Body>
                                                <Right style={{ flex: 0.3 }}>
                                                    <Icon name="md-lock" style={[styles.icon, { paddingRight: 15 }]} />
                                                </Right>
                                            </View>
                                        ) :
                                        (
                                            <LessonCard key={key} location={'LessonDetail'} margin_top={10} margin_bottom={10}
                                                id={courses[key].id} title={courses[key].title[lang]}
                                                profile_point={courses[key].profile_point} point={courses[key].point} progress={courses[key].progress} />
                                        )
                                )
                            }
                        </ScrollView>
                    </View>
                    <ContinueInfo navigation={this.props.navigation} />
                </Content>
            );

        } else {
            this._bootstrapAsync().then(
                () => {
                    this.setState({ loaded: true })
                }
            )
            return (<Loading />);
        }

    }

}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: '#0083E8'
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