import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { Spinner, Text, Icon, Button } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AwesomeButton from "react-native-really-awesome-button";
import { URL } from '../../components/basic/url';
import { deviceLanguage } from '../../components/basic/device-language';
import NavigationService from '../../components/navigation/NavigationService';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import Modal from "react-native-modal";
import SwitchButton from 'switch-button-react-native';
var ls = require('react-native-local-storage');

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Platform.OS === "ios" ? Dimensions.get("window").height : 2000;

export default class BuyNow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            btn_progress: false,
            response_message: '',
            type: '',
            isModalVisible: false,
            account: '',
            subscription: 1,
            lang: '1',
            translations: [],
            balance_info: []
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

        let token = await ls.get('token');

        if (token !== null) {
            this.getBalanceInfo();
        }

    }

    getBalanceInfo = async () => {

        let token = await ls.get('token');
        let account = await ls.get('account');

        let jsonObj = {
            token: token,
            account: account
        }

        axios.post(URL + 'api/account/finance', jsonObj)
            .then(result => this.setState({
                balance_info: result.data.result
            }))
    }

    buyNow = async () => {
        this.setState({ btn_progress: true });
        let token = await ls.get('token');
        let account = await ls.get('account');
        let kid_id = await ls.get('kid_id');
        let course = this.props.id;
        let subscribe = '';
        if (this.state.subscription === 1) {
            subscribe = "monthly";
        } else {
            subscribe = "yearly";
        }

        let jsonObj = {
            token: token,
            account: account,
            profile: kid_id,
            course: course,
            subscribe: subscribe
        }

        axios.post(URL + 'api/account/profile/buy', jsonObj)
            .then(result => {
                if (result.data.error === true) {
                    this.setState({ btn_progress: false, response_message: result.data.message, type: 'danger' });
                } else {
                    this.redirectToLesson();
                }
            })
            .catch(error => this.setState({ btn_progress: false, response_message: "Sistem xətası", type: 'danger' }));

    }

    toggleModal = async () => {
        let account = await ls.get('account');
        this.setState({ isModalVisible: !this.state.isModalVisible, response_message: '', type: '', account: account });
    }

    redirectToBalance = () => {
        this.toggleModal();
        NavigationService.navigate('Balance');
    }

    redirectToLesson = () => {
        this.toggleModal();
        NavigationService.navigate('Lesson');
    }

    render() {

        const { btn_progress, isModalVisible, response_message, type, account, lang, translations, balance_info } = this.state
        const { title, price, price_subscription } = this.props;

        btn_text = <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['Təsdiqlə']) : ('')}</Text>;
        if (btn_progress) {
            btn_text = <Spinner color='#fff' />
        }

        if (type === 'danger') {
            modalBody =
                <View>
                    <Icon style={[styles.icon, { color: '#E0436B' }]} name="ios-close-circle-outline" size={200} />
                    <Text style={[styles.responseText, { color: '#E0436B' }]}>{response_message}</Text>
                </View>;
            modalFooter =
                <View style={styles.btnGroupView}>
                    <View style={styles.btnView}>
                        <AwesomeButton onPress={() => this.toggleModal()} width={wp('40%')} borderRadius={10} textColor="#fff" backgroundColor="#E0436B" backgroundDarker="#A32B4A" backgroundShadow="#fff">
                            <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['Bağla']) : ('')}</Text>
                        </AwesomeButton>
                    </View>
                </View>
        } else if (type === 'success') {
            modalBody =
                <View>
                    <Icon style={[styles.icon, { color: '#3ECC52' }]} name="ios-checkmark-circle-outline" size={200} />
                    <Text style={[styles.responseText, { color: '#3ECC52' }]}>{response_message}</Text>
                </View>;
            modalFooter =
                <View style={styles.btnGroupView}>
                    <View style={styles.btnView}>
                        <AwesomeButton onPress={() => this.toggleModal()} width={wp('40%')} borderRadius={10} textColor="#fff" backgroundColor="#E0436B" backgroundDarker="#A32B4A" backgroundShadow="#fff">
                            <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['Bağla']) : ('')}</Text>
                        </AwesomeButton>
                    </View>
                </View>
        } else if (account === null) {
            modalBody =
                <View>
                    <Text style={styles.title}>
                        {(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['Dərsliyi almaq üçün hesabınıza daxil olun']) : ('')}
                    </Text>
                </View>;
            modalFooter =
                <View style={styles.btnGroupView}>
                    <View style={styles.btnView}>
                        <AwesomeButton onPress={() => NavigationService.navigate('Login')} width={wp('40%')} borderRadius={10} textColor="#fff" backgroundColor="#0083E8" backgroundDarker="#0F5D99" backgroundShadow="#fff">
                            <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Login']['Daxil ol']) : ('')}</Text>
                        </AwesomeButton>
                    </View>
                </View>
        } else {
            monthly = ((typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['AYLIQ']) : ('')) + ' ' + price_subscription + ' AZN';
            yearly = ((typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['İLLİK']) : ('')) + ' ' + price + ' AZN';
            modalBody =
                <View>
                    <Text style={styles.title}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['Dərsin adı']) : ('')}</Text>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={[styles.title, { marginTop: 20, marginBottom: 10 }]}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['Plan']) : ('')}</Text>
                    <SwitchButton
                        onValueChange={(val) => this.setState({ subscription: val })}
                        text1={monthly}
                        text2={yearly}
                        style={styles.switch}
                        switchWidth={270}
                        switchHeight={50}
                        switchdirection='rtl'
                        switchSpeedChange={100}
                        switchBorderColor='#0083E8'
                        switchBackgroundColor='#fff'
                        btnBorderColor='#0083E8'
                        btnBackgroundColor='#0083E8'
                        fontColor='#b1b1b1'
                        activeFontColor='#fff'
                    />
                </View>;
            modalFooter =
                <View style={styles.btnGroupView}>
                    <View style={styles.btnView}>
                        <AwesomeButton onPress={() => this.toggleModal()} width={wp('30%')} borderRadius={10} textColor="#333" backgroundColor="#E0436B" backgroundDarker="#A32B4A" backgroundShadow="#fff">
                            <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['Ləğv et']) : ('')}</Text>
                        </AwesomeButton>
                    </View>
                    <View style={styles.btnView}>
                        <AwesomeButton onPress={() => this.buyNow()} width={wp('30%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#fff">
                            {btn_text}
                        </AwesomeButton>
                    </View>
                </View>
        }

        return (
            <View style={styles.inlineView}>
                <View style={styles.priceView}>
                    <Text style={styles.priceText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['AYLIQ']) : ('')} : {price_subscription} AZN</Text>
                    <Text style={styles.priceText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['BuyNow']['İLLİK']) : ('')} : {price} AZN</Text>
                </View>
                <View style={styles.buynowView}>
                    <AwesomeButton onPress={() => this.toggleModal()} width={wp('40%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8">
                        <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Course Info']['İndi al']) : ('')}</Text>
                    </AwesomeButton>
                </View>
                {(isModalVisible) ?
                    <Modal
                        style={{ marginTop: hp('50%') }}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight}
                        backdropColor="#abacac" backdropOpacity={0.90}
                        isVisible={isModalVisible}
                        onBackdropPress={() => this.toggleModal()}>
                        <View style={styles.modalStyle}>
                            {(typeof balance_info.balance !== 'undefined') ?
                                (
                                    <View style={styles.modalBalanceView}>
                                        <View style={styles.modalBalanceTextView}><Text style={styles.modalBalanceText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Balans']) : ('')}: {(balance_info.balance !== null) ? (balance_info.balance) : ('0')} AZN</Text></View>
                                        <View style={styles.modalBalanceTextView}>
                                            <Button onPress={() => this.redirectToBalance()} iconRight style={styles.modalBalanceText} transparent small>
                                                <Text>{lang === '1' ? 'Balans artır' : 'Увеличить баланс'}</Text>
                                                <Icon name='arrow-forward' />
                                            </Button>
                                        </View>
                                    </View>
                                ) : (<View></View>)}

                            <View style={styles.modalTextView}>
                                {modalBody}
                            </View>
                            {modalFooter}
                        </View>
                    </Modal>
                    : null}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    inlineView: {
        flexDirection: 'row',
        marginTop: 15
    },
    priceView: {
        flex: 1,
        marginLeft: 15,
        alignItems: 'flex-start'
    },
    priceText: {
        fontSize: RFValue(13),
        color: '#0083E8',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    buynowView: {
        flex: 1,
        marginRight: 15,
        alignItems: 'flex-end'
    },
    icon: {
        fontSize: 70,
        textAlign: 'center'
    },
    responseText: {
        fontSize: RFValue(25),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalStyle: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    modalBalanceView: {
        flex: 0.5,
        flexDirection: 'row'
    },
    modalBalanceTextView: {
        flex: 1,
        alignItems: 'center',
    },
    modalBalanceText: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    modalTextView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: RFValue(18),
        color: '#0083E8',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        fontSize: RFValue(20),
        color: '#333',
        textAlign: 'center'
    },
    btnGroupView: {
        flex: 1,
        flexDirection: 'row'
    },
    btnView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    switch: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    btnText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff'
    }
});