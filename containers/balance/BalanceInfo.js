import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Content, H2, Text } from 'native-base';
import Loading from '../../components/basic/Loading';
import { URL } from '../../components/basic/url';
import axios from 'axios';
import showToast from '../../helper/ToastAlert';
import BalanceAccordion from './BalanceAccordion';
var ls = require('react-native-local-storage');

export default class BalanceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: '',
            balance_info: [],
            lang: '1',
            translations: []
        }
    }

    async componentDidMount() {
        let token = await ls.get('token');
        let account = await ls.get('account');

        let jsonObj = {
            token: token,
            account: account
        }

        let kid_lang = await ls.get('kid_lang');
        let translations = await ls.get('translations');
        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        }
        this.setState({ translations: translations });

        this.getBalanceInfo(jsonObj);
    }

    getBalanceInfo = (jsonObj) => {
        this.setState({ isLoading: true })
        axios.post(URL + 'api/account/finance', jsonObj)
            .then(result => this.setState({
                isLoading: false,
                balance_info: result.data.result
            }))
            .catch(error => this.setState({
                isLoading: true,
                error: error
            }, () => showToast("Sistem xətası", "danger")));
    }

    render() {

        const { isLoading, balance_info, lang, translations } = this.state;

        if (isLoading && balance_info.length === 0) {
            return (
                <Loading />
            );
        }

        return (
            <Content style={{ backgroundColor: "#F5F6F8" }} contentContainerStyle={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <H2 style={styles.balanceInfo}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Balans']) : ('')}: {(balance_info.balance !== null) ? (balance_info.balance) : ('0')} AZN</H2>
                    <Text style={styles.balanceInfo}>Payment id: {balance_info.payment_id}</Text>
                    {
                        (balance_info.transaction.length > 0) ?
                            (
                                <ScrollView style={{ flexGrow: 1 }}>
                                    {
                                        balance_info.transaction.map(b =>
                                            <BalanceAccordion key={b.id} item={b.id} title={b.desc} amount={b.amount} balance={b.balance} balance_new={b.balance_new} action={b.action} date={b.date} />
                                        )
                                    }
                                </ScrollView>
                            ) : (<View></View>)
                    }
                </View>
            </Content>
        );
    }

}
const styles = StyleSheet.create({
    balanceInfo: {
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20
    },
    paymentId: {
        marginLeft: 20,
        marginBottom: 10
    }
});