import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { CardItem, Icon, Text } from 'native-base';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import NavigationService from '../../components/navigation/NavigationService';
import { deviceLanguage } from '../../components/basic/device-language';
var ls = require('react-native-local-storage');

export default class CourseContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    }

    render() {

        const { lang, translations } = this.state;

        return (
            <View style={styles.aboutCard}>
                <CardItem header bordered style={styles.cardItem}>
                    <Text style={styles.cardTitle}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Course Info']['Mündəricat']) : ('')}</Text>
                </CardItem>
                <View style={styles.chapterView}>
                    {(typeof this.props.chapters !== 'undefined') ?
                        (
                            Object.keys(this.props.chapters).map((key, index) =>
                                <View style={{ flex: 1 }} key={key}>
                                    <Collapse>
                                        <CollapseHeader>
                                            <View style={styles.chapterAccordion}>
                                                <View style={styles.chapterAccordionTextView}><Text style={styles.chapterAccordionText}>{this.props.chapters[key].title[this.props.lang]}</Text></View>
                                                <View style={styles.chapterAccordionIcon}><Icon name="ios-arrow-down" /></View>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            {
                                                Object.keys(this.props.chapters[key].part).map((key1, index1) =>
                                                    <View key={key1} style={styles.chapterCard}>
                                                        <View style={[styles.cardLeft, { backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }]}></View>
                                                        <ScrollView style={{ flex: 1 }} horizontal={true}>
                                                            <Text style={styles.pageText}>{this.props.chapters[key].part[key1].title[this.props.lang]}</Text>
                                                        </ScrollView>
                                                        {
                                                            (this.props.chapters[key].part[key1].has_preview[this.props.lang] === true) ?
                                                                (
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() =>
                                                                            NavigationService.navigate('Section',
                                                                                {
                                                                                    page_title: this.props.course_info.title[this.props.lang],
                                                                                    title: this.props.chapters[key].title[this.props.lang],
                                                                                    parts: this.props.chapters[key].part,
                                                                                    from_page: 'course_info'
                                                                                }
                                                                            )}>
                                                                            <View style={[styles.pointView, { alignItems: 'flex-end' }]}>
                                                                            <Icon name="md-unlock" style={styles.eyeIcon} />
                                                                        </View>
                                                                    </TouchableWithoutFeedback>
                                                                ) : (<View></View>)
                                                        }
                                                    </View>
                                                )
                                            }
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                            )
                        )
                        : (<View></View>)}
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    aboutCard: {
        flex: 1,
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 15
    },
    cardItem: {
        borderRadius: 15
    },
    cardTitle: {
        color: '#0083E8',
        fontWeight: 'bold'
    },
    chapterView: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10
    },
    chapterAccordion: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    chapterAccordionTextView: {
        flex: 4,
        marginLeft: 10
    },
    chapterAccordionText: {
        fontWeight: 'bold'
    },
    chapterAccordionIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chapterCard: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#d6d6d6',
        flexDirection: 'row',
        height: 40,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5
    },
    cardLeft: {
        flex: 0.05,
        borderTopStartRadius: 5,
        borderBottomStartRadius: 5
    },
    pageText: {
        flexShrink: 1,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 10
    },
    eyeIcon: {
        color: '#0083E8',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 10
    },
    pointView: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointText: {
        color: '#0083E8',
        fontWeight: 'bold',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
});