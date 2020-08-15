import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, H2, Text } from 'native-base';
import { URL } from '../../components/basic/url';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import AwesomeButton from "react-native-really-awesome-button";
import NavigationService from '../../components/navigation/NavigationService';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var ls = require('react-native-local-storage');

export default class ActivityInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance_info: [],
            lang: '1',
            translations: [],
            images: [
                { id: 1, image: require('../../assets/payments/hesabaz.png') },
                { id: 2, image: require('../../assets/payments/emanat.jpg') },
                { id: 3, image: require('../../assets/payments/epay.png') }
            ]
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
        axios.post(URL + 'api/account/finance', jsonObj).then(result => this.setState({ balance_info: result.data.result }));
    }

    _renderItem = ({ item, index }) => {

        return (
            <Image resizeMode="contain" style={styles.img} source={item.image} />
        );

    }

    render() {

        const { translations, lang, balance_info, images } = this.state;

        return (
            <View style={styles.successView}>
                <H2 style={styles.balanceInfo}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Balans']) : ('')}: {(balance_info.balance !== null) ? (balance_info.balance) : ('0')} AZN</H2>
                <Text style={styles.balanceInfo}>Payment id: {balance_info.payment_id}</Text>
                <Text style={styles.addBalanceInfo}>{lang === '1' ? 'Balansınızı aşağıdakı yollarla artıra bilərsiniz:' : 'Вы можете увеличить баланс внизу отмеченными способами:'}</Text>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    extraData={this.state}
                    data={images}
                    renderItem={this._renderItem}
                    sliderWidth={wp('80%')}
                    itemWidth={150}
                />
                <AwesomeButton onPress={() => NavigationService.navigate('Balance')} width={wp('70%')} borderRadius={10} backgroundColor="#fff" backgroundDarker="#c6c6c6" backgroundShadow="#F8F8F8" style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>{lang === '1' ? 'Ödənişlər' : 'Платежи'}</Text>
                </AwesomeButton>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    successView: {
        flex: 1,
        marginTop: 15,
        marginLeft: 25,
        marginRight: 25
    },
    balanceInfo: {
        marginBottom: 10
    },
    addBalanceInfo: {
        marginBottom: 30
    },
    img: {
        width: null,
        height: 180
    },
    logoutBtn: {
        alignSelf: 'center'
    },
    logoutText: {
        color: '#E0436B',
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold'
    }
});