import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { deviceLanguage } from '../../components/basic/device-language';
import NavigationService from '../../components/navigation/NavigationService';
import AwesomeButton from "react-native-really-awesome-button";
var ls = require('react-native-local-storage');

export default class SuccessInfo extends Component {

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

        if (kid_lang === null && deviceLanguage === 'ru_RU') {
            this.setState({ lang: '3' });
        }

        this.setState({ translations: translations });
    }

    render() {

        const { lang, translations } = this.state;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    <Icon style={styles.icon} name="ios-checkmark-circle-outline" size={200} />
                    <Text style={styles.text}>{this.props.navigation.getParam('message')}</Text>
                    <AwesomeButton width={wp('50%')} borderRadius={10} backgroundColor="#0083E8" backgroundDarker="#0F5D99" backgroundShadow="#F8F8F8" onPress={() => NavigationService.navigate('Login')}>
                        <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Daxil olun']) : ('')}</Text>
                    </AwesomeButton>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8'
    },
    icon: {
        fontSize: 100,
        color: '#0083E8'
    },
    btnText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff'
    },
    text: {
        color: '#333',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 20
    }
});