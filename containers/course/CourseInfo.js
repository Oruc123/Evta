import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { CardItem, Text, Content } from 'native-base';
import Loading from '../../components/basic/Loading';
import { URL } from '../../components/basic/url';
import { deviceLanguage } from '../../components/basic/device-language';
import axios from 'axios';
import showToast from '../../helper/ToastAlert';
import BuyNow from './BuyNow';
import CourseContent from './CourseContent';
import Preview from './Preview';
var ls = require('react-native-local-storage');

export default class CourseInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: '',
            course_info: [],
            check_course: null,
            lang: '1',
            translations: []
        }
    }

    async componentDidMount() {
        let kid_lang = await ls.get('kid_lang');
        let translations = await ls.get('translations');
        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        } else if (kid_lang === null && deviceLanguage === 'ru_RU') {
            this.setState({ lang: '3' });
        }
        this.setState({ translations: translations });
        this.getCourseInfo(this.props.id);
    }

    getCourseInfo = (id) => {
        this.setState({ isLoading: true })
        axios.get(URL + 'api/course/course/' + id)
            .then(result => this.setState({
                isLoading: false,
                course_info: result.data.result
            }))
            .catch(error => this.setState({
                isLoading: true,
                error: error
            }, () => showToast("Sistem xətası", "danger")));
    }

    render() {

        const { isLoading, course_info, lang, translations } = this.state;

        if (isLoading && course_info.length === 0) {
            return (
                <Loading />
            );
        }

        return (
            <Content>
                <View style={styles.view}>
                    {(typeof course_info !== 'undefined') ? (<Preview course_info={course_info} lang={lang} />) : (<View></View>)}
                    {(typeof course_info.title !== 'undefined') ? (<BuyNow id={this.props.id} title={course_info.title[lang]} price={course_info.price} price_subscription={course_info.price_subscription} />) : (<View></View>)}
                    <View style={styles.aboutCard}>
                        <CardItem header bordered style={{ borderRadius: 15 }}>
                            <Text style={styles.cardTitle}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Course Info']['Kursa nələr daxildir']) : ('')}</Text>
                        </CardItem>
                        <View style={styles.textView}>
                            {(typeof course_info.text !== 'undefined') ?
                                (<Text>{course_info.text[lang]}</Text>)
                                : (<Text></Text>)}
                        </View>
                    </View>
                    {(typeof course_info.chapters !== 'undefined') ? (<CourseContent chapters={course_info.chapters} course_info={course_info} lang={lang} />) : (<View></View>)}
                </View>
            </Content>
        );
    }

}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20
    },
    textView: {
        padding: 20
    },
    aboutCard: {
        flex: 1,
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 15
    },
    cardTitle: {
        color: '#0083E8',
        fontWeight: 'bold'
    }
});