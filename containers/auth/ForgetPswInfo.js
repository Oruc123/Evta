import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input, Item, Spinner } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import AwesomeButton from "react-native-really-awesome-button";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NavigationService from '../../components/navigation/NavigationService';
import { URL } from '../../components/basic/url';
import { deviceLanguage } from '../../components/basic/device-language';
import axios from 'axios';
import showToast from '../../helper/ToastAlert';
import ForgetPswHeader from '../../components/basic/header/ForgetPswHeader';
import Captcha from './Captcha';
var ls = require('react-native-local-storage');

export default class ForgetPswInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phrase: '',
            btn_progress: false,
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

    sendEmail = () => {
        this.setState({ btn_progress: true });
        axios.post(URL + "api/account/forgotten", { ...this.state })
            .then(result => {
                if (result.data.error === true) {
                    showToast(result.data.message, 'danger');
                    this.setState({ btn_progress: false });
                } else {
                    showToast(result.data.message, "success");
                    this.setState({ btn_progress: false });
                }
            })
            .catch(error => this.showToast("Sistem xətası", "danger"));
    }

    render() {

        const { btn_progress, email, phrase, lang, translations } = this.state;

        btn_text = <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Forget Password']['Şifrəni yenilə']) : ('')}</Text>;

        if (btn_progress) {
            btn_text = <Spinner color='#fff' />
        }

        return (
            <View style={styles.view}>
                <ForgetPswHeader />
                <Text style={[styles.headText, { marginTop: hp('10%') }]}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Forget Password']['Şifrəni unutmusunuz?']) : ('')}</Text>
                <Text style={styles.infoText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Forget Password']['Şifrənin yenilənməsi barədə təlimat dərhal E-mail ünvanınıza göndəriləcək']) : ('')}</Text>
                <Item style={styles.input} regular>
                    <Input placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Forget Password']['Sizin email']) : ('')} onChangeText={(text) => this.setState({ email: text })} value={email} />
                </Item>
                <Captcha navigation={this.props.navigation} />
                <Item style={styles.input} regular>
                    <Input placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Forget Password']['Kod']) : ('')} onChangeText={(text) => this.setState({ phrase: text })} value={phrase} />
                </Item>
                <AwesomeButton onPress={() => this.sendEmail()} width={wp('80%')} borderRadius={10} backgroundColor="#E0436B" backgroundDarker="#A32B4A" backgroundShadow="#F8F8F8" style={styles.btn}>
                    {btn_text}
                </AwesomeButton>
                <Text style={styles.infoText} onPress={() => NavigationService.navigate('Login')}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Forget Password']['Daxil olun']) : ('')}</Text>
                <Text style={styles.infoText} onPress={() => NavigationService.navigate('Signup')}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Forget Password']['Yeni Hesab Yaradın']) : ('')}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    headText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        textAlign: "center",
        color: '#E0436B'
    },
    infoText: {
        textAlign: "center",
        color: '#939393',
        marginTop: hp('2%')
    },
    input: {
        marginTop: hp('3%'),
        marginRight: hp('3%'),
        marginLeft: hp('3%'),
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    btn: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: hp('2%'),
        marginBottom: hp('2%')
    },
    btnText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff'
    }
});