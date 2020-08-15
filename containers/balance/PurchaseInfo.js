import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
var ls = require('react-native-local-storage');

export default class PurchaseInfo extends Component {

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
        const { balance, balance_new, date, updated_height } = this.props;

        return (
            <View style={{ flex: 1, height: updated_height }}>
                <Text style={styles.text}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Əvvəlki balans']) : ('')}: {balance} AZN</Text>
                <Text style={styles.text}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Yeni balans']) : ('')}: {balance_new} AZN</Text>
                <Text style={styles.text}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Tarix']) : ('')}: {date.substring(0, 16)}</Text>
                <Text>{`\n`}</Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        marginLeft: 22
    },
    priceText: {
        fontSize: RFValue(13),
        fontWeight: 'bold'
    }
});