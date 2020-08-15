import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Content, View, Text } from 'native-base';
import ActivityInfo from './ActivityInfo';
import SettingsForm from '../settings/SettingsForm';
import AccountCarousel from './AccountCarousel';
var ls = require('react-native-local-storage');

export default class AccountInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activityColor: '#333',
            settingsColor: '#0083E8',
            content: 'activity',
            lang: '1',
            translations: []
        }
    }

    async componentDidMount() {
        let kid_lang = await ls.get('kid_lang');
        let translations = await ls.get('translations');
        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        }
        this.setState({ translations: translations });
    }

    changeContent = (type) => {
        if (type === 'activity') {
            this.setState({ activityColor: '#333', settingsColor: '#0083E8', content: 'activity' });
        } else {
            this.setState({ activityColor: '#0083E8', settingsColor: '#333', content: 'settings_form' });
        }
    }

    render() {

        const { activityColor, settingsColor, content, lang, translations } = this.state;

        return (
            <Content>
                <View style={styles.view}>
                    <View style={{ flex: 1 }}>
                        <AccountCarousel navigation={this.props.navigation} />
                    </View>
                    <View style={styles.rowView}>
                        <TouchableWithoutFeedback onPress={() => this.changeContent('activity')}>
                            <View style={styles.leftView}>
                                <Text style={[styles.text, { color: activityColor }]}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Balans']) : ('')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.changeContent('settings_form')}>
                            <View style={styles.rightView}>
                                <Text style={[styles.text, { color: settingsColor }]}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Account']['Ayarlar']) : ('')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                {
                    (content === 'activity') ?
                        (<ActivityInfo />) : (<SettingsForm />)
                }
            </Content>
        );
    }

}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowView: {
        flex: 0.1,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20
    },
    leftView: {
        flex: 1,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#c6c6c6',
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    rightView: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    text: {
        fontWeight: 'bold'
    }
});