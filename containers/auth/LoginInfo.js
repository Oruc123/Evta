import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { View, Text, Input, Item } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import AwesomeButton from "react-native-really-awesome-button";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NavigationService from '../../components/navigation/NavigationService';
import { URL } from '../../components/basic/url';
import { deviceLanguage } from '../../components/basic/device-language';
import TextInputMask from 'react-native-text-input-mask';
import axios from 'axios';
import showToast from '../../helper/ToastAlert';
var ls = require('react-native-local-storage');

export default class LoginInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            kid_id: '',
            kid_lang: '',
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

    saveUserSession = (token, account) => {
        ls.save('token', token);
        ls.save('account', account);
        let jsonObj = {
            token: token,
            account: account
        }
        axios.post(URL + "api/account/me", jsonObj).then(result => {
            ls.save('kid_id', result.data.result.profile[0].id);
            ls.save('kid_lang', result.data.result.profile[0].fk_lang);
            NavigationService.navigate('Home');
        });
    }

    login = () => {
        if (this.state.phone.trim().length === 0 || !this.state.phone.match('.+@.+\\.[a-z]+')) {
            showToast("Mail adresinizin doğruluğunu yoxlayın", "danger")
        } else if (this.state.password.trim().length === 0) {
            showToast("Zəhmət olmasa, şifrənizi daxil edin", "danger")
        } else {
            let jsonObj = {
                phone: this.state.phone,
                password: this.state.password
            }
            axios.post(URL + "api/account/login", jsonObj)
                .then(result => {
                    if (result.data.error === true) {
                        showToast(result.data.message, 'danger');
                    } else {
                        this.saveUserSession(result.data.result.token, result.data.result.account);
                    }
                }
                )
                .catch(error => showToast("Sistem xətası", "danger"));
        }

    }

    render() {

        const { phone, password, lang, translations } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                <ImageBackground resizeMode="stretch" source={require('../../assets/auth/login_info.jpg')} style={styles.imageBackground}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.loginText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Login']['Daxil olun']) : ('')}</Text>
                        <Text style={styles.signupText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Login']['Hesabınız yoxdur?']) : ('')} <Text style={{ color: '#39BD4B' }} onPress={() => NavigationService.navigate('Signup')}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Login']['Qeydiyyat']) : ('')}</Text></Text>
                        <Item style={styles.input} regular>
                            <TextInputMask
                                style={{ width: wp('87%'), fontSize: RFValue(15), color: '#333' }}
                                placeholderStyle={{ fontSize: RFValue(15), color: '#333' }}
                                refInput={ref => { this.input = ref }}
                                onChangeText={(formatted) => {
                                    this.setState({ phone: formatted })
                                }}
                                keyboardType={"number-pad"}
                                placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Telefon nömrəniz']) : ('')}
                                value={phone}
                                mask={"+994 ([00]) [000] [00] [00]"}
                            />
                        </Item>
                        <Item style={styles.input} regular>
                            <Input secureTextEntry={true} placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Login']['Şifrə']) : ('')} onChangeText={(text) => this.setState({ password: text })} value={password} />
                        </Item>
                        <AwesomeButton onPress={() => this.login()} type="primary" width={wp('80%')} borderRadius={10} backgroundColor="#0083E8" backgroundDarker="#0F5D99" backgroundShadow="#F8F8F8" style={styles.btn}>
                            <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Login']['Daxil ol']) : ('')}</Text>
                        </AwesomeButton>
                        <Text style={styles.forgetPswText} onPress={() => NavigationService.navigate('ForgetPsw')}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Login']['Şifrəni unutmusunuz?']) : ('')}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                    </View>
                </ImageBackground>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    loginText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: hp('10%'),
        color: '#0083E8'
    },
    signupText: {
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
        marginTop: hp('2%')
    },
    forgetPswText: {
        textAlign: "center",
        marginTop: hp('2%'),
        color: '#0083E8'
    },
    btnText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff'
    }
});