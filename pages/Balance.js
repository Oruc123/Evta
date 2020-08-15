import React, { Component } from 'react';
import { Container } from 'native-base';
import AppHeader from '../components/basic/AppHeader';
import AppFooter from '../components/basic/AppFooter';
import BalanceInfo from '../containers/balance/BalanceInfo';
var ls = require('react-native-local-storage');

export default class Balance extends Component {

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
        this.setState({ translations: translations });

    }

    render(){

        const { lang, translations } = this.state;

        return (
            <Container style={{ backgroundColor: '#f8f8f8' }}>
                <AppHeader navigation={this.props.navigation} type={"settings"} backTo={"Settings"} title={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Balans']) : ('')} />
                <BalanceInfo />
                <AppFooter />
            </Container>
        );
    }

}