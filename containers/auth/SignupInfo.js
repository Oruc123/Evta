import React, { Component } from 'react';
import { StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { View, Text, Input, Item, Icon, Picker, Spinner, CheckBox } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import AwesomeButton from "react-native-really-awesome-button";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NavigationService from '../../components/navigation/NavigationService';
import { URL } from '../../components/basic/url';
import { deviceLanguage } from '../../components/basic/device-language';
import TextInputMask from 'react-native-text-input-mask';
import showToast from '../../helper/ToastAlert';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
var ls = require('react-native-local-storage');

export default class SignupInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            password: '',
            dictionary: [],
            kid_name: '',
            fk_class: '',
            fk_lang: '',
            code_input: '',
            btn_progress: false,
            isChecked: false,
            lang: '1',
            translations: [],
            code_sent: null,
            confirm_result: null
        }
    }

    async componentDidMount() {

        let kid_lang = await ls.get('kid_lang');
        let translations = await ls.get('translations');

        if (kid_lang === null && deviceLanguage === 'ru_RU') {
            this.setState({ lang: '3' });
        }

        this.setState({ translations: translations });
        this.getDictionary();
    }

    getDictionary = () => {
        axios.get(URL + 'api/dictionary').then(result => this.setState({ dictionary: result.data }))
    }

    signup = () => {

        const { phone } = this.state;

        auth()
            .verifyPhoneNumber(phone)
            .on('state_changed', (phoneAuthSnapshot) => {

                switch (phoneAuthSnapshot.state) {

                    case auth.PhoneAuthState.CODE_SENT:
                        this.setState({ code_sent: "code_sent" });
                        console.log("code send: ", phoneAuthSnapshot);
                        break;
                    case auth.PhoneAuthState.ERROR:
                        break;
                    case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
                        this.setState({ code_sent: "code_sent" });
                        break;
                    case auth.PhoneAuthState.AUTO_VERIFIED:

                        auth().signInWithPhoneNumber(phone)
                            .then(confirm_result => {
                                NavigationService.navigate('Home');
                            }
                            )
                            .catch(error => {
                                console.log("error: ", error);
                            });

                        break;
                }
            }, (error) => {
                console.log("error.verificationId: ", error.verificationId);
            }, (phoneAuthSnapshot) => {
                console.log(phoneAuthSnapshot);
            });



        // if (this.state.name.trim().length === 0) {
        //     showToast('Zəhmət olmasa, Ad soyadınızı daxil edin', 'danger');
        // } else if (this.state.phone.trim().length === 0) {
        //     showToast('Zəhmət olmasa, telefon nömrənizi daxil edin', 'danger');
        // } else if (this.state.password.trim().length === 0) {
        //     showToast('Zəhmət olmasa, şifrənizi daxil edin', 'danger');
        // } else if (this.state.password.trim().length < 6 || this.state.password.trim().length > 32) {
        //     showToast('Şifrənizin uzunluğu minimum 6 maksimum 32 simvoldan ibarət olmalıdır', 'danger');
        // } else if (this.state.kid_name.trim().length === 0) {
        //     showToast('Zəhmət olmasa, Şagirdin ad soyadını daxil edin', 'danger');
        // } else if (this.state.fk_class.trim().length === 0) {
        //     showToast('Zəhmət olmasa, Şagirdin sinifini daxil edin', 'danger');
        // } else if (this.state.fk_lang.trim().length === 0) {
        //     showToast('Zəhmət olmasa, Şagirdin sektorunu daxil edin', 'danger');
        // } else if (this.state.isChecked === false) {
        //     showToast('Zəhmət olmasa, Şərtlər və qaydalarla razılaşın', 'danger');
        // } else {

        //     jsonObj = {
        //         name: this.state.name,
        //         phone: this.state.phone,
        //         password: this.state.password,
        //         profile: {
        //             fk_lang: this.state.fk_lang,
        //             fk_class: this.state.fk_class,
        //             name: this.state.kid_name
        //         }
        //     }

        //     this.setState({ btn_progress: true })

        //     axios.post(URL + "api/account/register", jsonObj)
        //         .then(result => {
        //             if (result.data.error === true) {
        //                 showToast(result.data.message, 'danger');
        //                 this.setState({ btn_progress: false });
        //             } else {
        //                 this.setState({ name: '', phone: '', password: '', kid_name: '', fk_class: '', fk_lang: '', btn_progress: false });
        //                 NavigationService.navigate('SuccessInfo', { message: result.data.message });
        //             }
        //         }
        //         )
        //         .catch(error => showToast("Sistem xətası", "danger"));

        // }
    }

    confirmCode = () => {
        const { code_input, confirm_result } = this.state;

        if (confirm_result) {
            confirm_result.confirm(code_input)
                .then((user) => {
                    NavigationService.navigate('Home');
                })
                .catch(error => {
                    showToast("Error", "danger");
                    this.setState({ btn_progress: false });
                });
        }
    }

    renderSignup = () => {

        const { name, phone, password, dictionary, kid_name, fk_class, fk_lang, btn_progress, isChecked, lang, translations } = this.state;

        if (btn_progress === false) {
            btn_text = <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Qeydiyyatdan keç']) : ('')}</Text>;
        } else {
            btn_text = <Spinner color='#fff' />
        }

        return (
            <View style={styles.view}>
                <Text style={[styles.headText, { marginTop: hp('10%') }]}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Yeni Hesab Yaradın']) : ('')}</Text>
                <Text style={styles.loginText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Hesabınız var?']) : ('')} <Text style={{ color: '#39BD4B' }} onPress={() => NavigationService.navigate('Login')}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Daxil olun']) : ('')}</Text></Text>
                <Item style={styles.input} regular>
                    <Input placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Adınız və soyadınız']) : ('')} onChangeText={(text) => this.setState({ name: text })} value={name} />
                </Item>
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
                <Text style={styles.noteText} note>{lang === '1' ? 'Telefon nömrənizi təsdiqləmək üçün birdəfəlik SMS mesajı göndəriləcək' : 'Мы отправим вам одноразовое SMS-сообщение для подтверждения вашего номера телефона'}</Text>
                <Item style={styles.input} regular>
                    <Input secureTextEntry={true} placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Şifrə']) : ('')} onChangeText={(text) => this.setState({ password: text })} value={password} />
                </Item>
                <Text style={[styles.headText, { marginTop: hp('2%') }]}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Şagird Məlumatlarını Daxil Edin']) : ('')}</Text>
                <Item style={styles.input} regular>
                    <Input placeholder='Şagirdin adı' onChangeText={(text) => this.setState({ kid_name: text })} value={kid_name} />
                </Item>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Item style={styles.input} picker regular>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Sinifi']) : ('')}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={fk_class}
                                onValueChange={(value) => this.setState({ fk_class: value })}
                            >
                                <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Sinifi']) : ('')} value="" />
                                {(typeof dictionary.class !== 'undefined') ?
                                    (dictionary.class.map(c =>
                                        <Picker.Item key={c.id} label={c.value} value={c.id} />
                                    )) : (
                                        <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Sinifi']) : ('')} value="" />
                                    )}
                            </Picker>
                        </Item>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Item style={styles.input} picker regular>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Sektoru']) : ('')}
                                placeholderStyle={{ color: '#39BD4B' }}
                                placeholderIconColor='#39BD4B'
                                selectedValue={fk_lang}
                                onValueChange={(value) => this.setState({ fk_lang: value })}
                            >
                                <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Sektoru']) : ('')} value="" />
                                {(typeof dictionary.lang !== 'undefined') ?
                                    (dictionary.lang.map(l =>
                                        <Picker.Item key={l.id} label={l.value} value={l.id} />
                                    )) : (
                                        <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Sektoru']) : ('')} value="" />
                                    )}
                            </Picker>
                        </Item>
                    </View>
                </View>
                <View style={styles.termsView}>
                    <View style={{ flex: 0.2 }}>
                        <CheckBox checked={isChecked} style={styles.checkbox} onPress={() => this.setState({ isChecked: !isChecked })} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => Linking.openURL("https://evta.az/qaydalar")}>
                            <Text style={styles.termsText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Qeydiyyatdan keçməklə siz Şərtlər və Qaydalarla razılaşırsınız.']) : ('')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AwesomeButton progress={btn_progress} onPress={() => this.signup()} width={wp('70%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8" style={styles.btn}>
                    {btn_text}
                </AwesomeButton>
            </View>
        );

    }

    renderVerificationCode = () => {

        const { code_input } = this.state;

        return (
            <View style={styles.view}>
                <Text style={[styles.headText, { marginTop: hp('10%') }]}>Kodu daxil edin</Text>
                <Item style={styles.input} regular>
                    <Input placeholder={"Code"} onChangeText={(text) => this.setState({ code_input: text })} value={code_input} />
                </Item>
                <AwesomeButton onPress={() => this.confirmCode()} width={wp('70%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8" style={styles.btn}>
                    <Text style={styles.btnText}>Confirm</Text>
                </AwesomeButton>
            </View>
        );

    }

    render() {

        const { code_sent } = this.state;

        return (
            <View>
                {!code_sent && this.renderSignup()}
                {code_sent && this.renderVerificationCode()}
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
        color: '#0083E8'
    },
    loginText: {
        textAlign: "center",
        color: '#939393',
        marginTop: hp('2%')
    },
    input: {
        marginTop: hp('3%'),
        marginRight: hp('2%'),
        marginLeft: hp('2%'),
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    noteText: {
        marginTop: 5,
        marginLeft: hp('2%'),
        marginRight: hp('1%')
    },
    termsView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp('3%')
    },
    checkbox: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: hp('3%')
    },
    termsText: {
        textAlign: "center",
        textDecorationLine: 'underline',
        color: '#939393',
        fontSize: RFValue(12),
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: hp('3%')
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