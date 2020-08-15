import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AwesomeButton from "react-native-really-awesome-button";
import { deviceLanguage } from '../basic/device-language';
import { URL } from '../basic/url';
import NavigationService from '../navigation/NavigationService';
import showToast from '../../helper/ToastAlert';
import axios from 'axios';
var ls = require('react-native-local-storage');

export default class ContinueInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: '1',
            translations: [],
            course_info: [],
            last_exercise: false
        }
        this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
            this.componentDidMount();
        });
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

        let token = await ls.get('token');
        let account = await ls.get('account');
        let kid_id = await ls.get('kid_id');

        console.log("kid_id ", kid_id);

        jsonObj = {
            token: token,
            account: account,
            profile: kid_id
        }

        if (token !== null) {
            this.checkCourse(jsonObj);
        }

    }

    getLastExercise = (jsonObj) => {
        axios.post(URL + "api/account/profile/info", jsonObj)
            .then(result => {
                this.setState({ last_exercise: result.data.result.last_exercise });
                this.getCourseInfo(result.data.result.last_exercise.fk_course);
            })
    }

    checkCourse = (jsonObj) => {
        axios.post(URL + 'api/course/list', jsonObj)
            .then(result => {
                if (result.data.result.length === 0) {
                    console.log("test");
                } else {
                    this.getLastExercise(jsonObj);
                }
            });
    }

    getCourseInfo = async (course_id) => {

        let token = await ls.get('token');
        let account = await ls.get('account');
        let kid_id = await ls.get('kid_id');

        jsonObj = {
            token: token,
            account: account,
            profile: kid_id,
            course: course_id
        }

        axios.post(URL + 'api/course/course', jsonObj)
            .then(result =>
                this.setState({
                    course_info: result.data.result
                })
            )
            .catch(error => showToast("Sistem xətası", "danger"));
    }

    render() {

        const { lang, translations, last_exercise, course_info } = this.state;

        return (
            <View>
                {
                    (course_info.chapters !== null && last_exercise !== false && typeof course_info.chapters !== 'undefined') ?
                        (
                            <View>
                                <Text style={styles.continueText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Qaldığın yerdən davam et']) : ('')}</Text>
                                {
                                    (course_info.chapters !== null) ?
                                        (
                                            <AwesomeButton
                                                onPress={() => NavigationService.navigate('SectionDetail',
                                                    {
                                                        id: last_exercise.fk_course_chapter_part_page_exercise,
                                                        exercise: course_info.chapters[last_exercise.fk_course_chapter].part[last_exercise.fk_course_chapter_part].page[last_exercise.fk_course_chapter_part_page].exercise,
                                                        page_title: course_info.title[lang],
                                                        section_title: course_info.chapters[last_exercise.fk_course_chapter].title[lang],
                                                        title: course_info.chapters[last_exercise.fk_course_chapter].part[last_exercise.fk_course_chapter_part].page[last_exercise.fk_course_chapter_part_page].title[lang],
                                                        from_page: 'lesson_detail_info'
                                                    })}
                                                width={wp('90%')} borderRadius={15} height={80} backgroundColor="#E0436B" backgroundDarker="#A32B4A" backgroundShadow="#F8F8F8" style={styles.continueView}>
                                                <View style={styles.textView}>
                                                    <Text style={styles.text}>{last_exercise.exercise[lang]}</Text>
                                                    <Text style={[styles.text, { marginBottom: 7 }]} note>{last_exercise.part[lang]}</Text>
                                                    <ProgressBarAnimated
                                                        width={wp('80%')}
                                                        height={10}
                                                        value={parseInt(last_exercise.progress) - 20}
                                                        backgroundColor="#39BD4B"
                                                        backgroundColorOnComplete="#39BD4B"
                                                    />
                                                </View>
                                            </AwesomeButton>
                                        ) : (<View></View>)
                                }
                            </View>
                        ) : (<View></View>)
                }
            </View>

        );
    }

}

const styles = StyleSheet.create({
    continueText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        color: '#E0436B'
    },
    continueView: {
        margin: 20,
        marginTop: 3
    },
    textView: {
        flex: 1,
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    text: {
        color: '#fff'
    }
});
