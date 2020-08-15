import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Header, Left, Right, Body, Icon, Title } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import NavigationService from '../../../components/navigation/NavigationService';
var ls = require('react-native-local-storage');

export default class AccountHeader extends Component {

    constructor(props){
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
        }
        this.setState({translations: translations});

    }

    render() {

        const { lang, translations } = this.state;

        return (
            <Header style={styles.header}>
                <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
                <Left style={{ flex: 0.5 }}></Left>
                <Body style={styles.headerBody}>
                    <Title style={styles.title}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Header']['Hesabım']) : ('')}</Title>
                </Body>
                <TouchableWithoutFeedback onPress={() => NavigationService.navigate('Settings')}>
                    <Right style={{ flex: 0.5 }}>
                        <TouchableWithoutFeedback onPress={() => NavigationService.navigate('Settings')}>
                            <Icon name='md-settings' size={25} style={styles.icon} />
                        </TouchableWithoutFeedback>
                    </Right>
                </TouchableWithoutFeedback>
            </Header>
        );

    }

}
const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff'
    },
    headerBody: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#333',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontWeight: '100',
        fontSize: RFValue(20)
    },
    icon: {
        color: '#8A8A8A',
        paddingRight: 15
    }
});
