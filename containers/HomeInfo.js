import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { View, Button, Text, Content, H2 } from 'native-base';
import ContinueInfo from '../components/theme/ContinueInfo';
import NavigationService from '../components/navigation/NavigationService';
import showToast from '../helper/ToastAlert';
import { URL } from '../components/basic/url';
import { deviceLanguage } from '../components/basic/device-language';
import axios from 'axios';
import Orientation from 'react-native-orientation';
var ls = require('react-native-local-storage');

export default class HomeInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            courses: [],
            lang: '1',
            translations: []
        }
        this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
            this.componentDidMount();
        });
    }

    async componentDidMount() {

        Orientation.lockToPortrait();

        let kid_lang = await ls.get('kid_lang');
        let translations = await ls.get('translations');

        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        } else if (kid_lang === null && deviceLanguage === 'ru_RU') {
            this.setState({ lang: '3' });
        }
        this.setState({ translations: translations });
        this.getCourses();

        let token = await ls.get('token');
        let account = await ls.get('account');
        let profile = await ls.get('profile');

        console.log(token);
        console.log(account);
        console.log(profile);

    }

    getCourses = () => {
        axios.get(URL + 'api/course/list')
            .then(result => this.setState({
                courses: result.data.result
            }))
            .catch(error => showToast("Sistem xətası", "danger"));
    }

    generateHexCode = (str) => {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    render() {

        const { courses, lang, translations } = this.state;

        function compare(a, b) {
            if (a.position < b.position) {
                return -1;
            }
            if (a.position > b.position) {
                return 1;
            }
            return 0;
        }

        let books = [];

        Object.keys(courses).map((key, index) => {
            books.push(courses[key]);
        })

        return (
            <Content style={{ backgroundColor: "#F5F6F8" }} contentContainerStyle={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <H2 style={{ marginLeft: 20, marginTop: 10 }}>{lang === '1' ? 'Dərsliklər ' : 'Учебники '}</H2>
                    <ScrollView style={{ flexGrow: 1 }}>
                        {
                            books.sort(compare).map(b =>
                                <TouchableWithoutFeedback key={b.id} onPress={() => NavigationService.navigate('Course', { id: b.id, title: b.title[lang] })}>
                                    <View style={[styles.card, { backgroundColor: this.generateHexCode(b.title["1"]) }]}>
                                        <View style={styles.card1}>
                                            <View style={styles.textView}>
                                                <Text>{b.title[lang]}</Text>
                                                <Text>{b.price_subscription} AZN</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <Button style={styles.moreBtn} small light onPress={() => NavigationService.navigate('Course', { id: b.id, title: b.title[lang] })}>
                                                        <Text uppercase={false} style={{ marginLeft: 'auto', marginRight: 'auto' }}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Lesson Card']['Daha Ətraflı']) : ('')}</Text>
                                                    </Button>
                                                    <Button small transparent onPress={() => NavigationService.navigate('Course', { id: b.id, title: b.title[lang] })}>
                                                        <Text uppercase={false}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Lesson Card']['Yeni']) : ('')}</Text>
                                                    </Button>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Image resizeMode="contain" style={styles.img} source={{ uri: b.image[lang] }} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }
                    </ScrollView>
                    <ContinueInfo navigation={this.props.navigation} />
                </View>
            </Content>
        );
    }

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10
    },
    card1: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 5,
        flexDirection: 'row'
    },
    textView: {
        flex: 2,
        padding: 20
    },
    moreBtn: {
        borderRadius: 10,
        marginTop: 5,
        width: 120,
        textAlign: 'center'
    },
    img: {
        flex: 1,
        width: null,
        height: 95,
        margin: 20
    },
    continueText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#E0436B'
    }
});