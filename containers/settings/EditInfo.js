import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Input, Item, Content, Spinner } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AwesomeButton from "react-native-really-awesome-button";
import NavigationService from '../../components/navigation/NavigationService';
import { URL } from '../../components/basic/url';
import { RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import showToast from '../../helper/ToastAlert';
import TextInputMask from 'react-native-text-input-mask';
import UserAvatar from 'react-native-user-avatar';
var ls = require('react-native-local-storage');

export default class EditInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: '',
            name: '',
            phone: '',
            lang: '1',
            translations: []
        }
    }

    async componentDidMount() {

        let token = await ls.get('token');
        let account = await ls.get('account');
        jsonObj = { token: token, account: account };
        this.getUserInfo(jsonObj);

        let kid_lang = await ls.get('kid_lang');
        let translations = await ls.get('translations');
        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        }
        this.setState({ translations: translations });

    }

    getUserInfo = (jsonObj) => {
        axios.post(URL + "api/account/me", jsonObj)
            .then(result => this.setState({ name: result.data.result.name, phone: result.data.result.phone }))
            .catch(error => showToast("Sistem xətası", "danger"));
    }

    edit = () => {

        if (this.state.name.trim().length === 0) {
            showToast('Zəhmət olmasa, Ad soyadınızı daxil edin', 'danger');
        } else if (this.state.phone.trim().length === 0) {
            showToast('Zəhmət olmasa, telefon nömrənizi daxil edin', 'danger');
        } else {

            axios.post(URL + "api/account/update", { ...this.state })
                .then(result => {
                    if (result.data.error === true) {
                        showToast(result.data.message, 'danger');
                    } else {
                        showToast(result.data.message, "success");
                    }
                }
                )
                .catch(error => showToast("Sistem xətası", "danger"));

        }
    }

    render() {

        const { name, phone, lang, translations } = this.state;

        return (
            <Content style={{ backgroundColor: '#f8f8f8' }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.infoView}>
                        {
                            (name.length > 0) ?
                                (<UserAvatar size="120" color="#E0436B" style={styles.thumbnail} name={name} />)
                                : (<Spinner color='#0083E8' />)
                        }
                    </View>
                    <View style={styles.formView}>
                        <Item style={styles.input} regular>
                            <Input onChangeText={(text) => this.setState({ name: text })} value={name} />
                        </Item>
                        <Item style={styles.input} regular>
                            <TextInputMask
                                style={{ width: wp('87%'), fontSize: RFValue(15), color: '#333' }}
                                placeholderStyle={{ fontSize: RFValue(15), color: '#333' }}
                                refInput={ref => { this.input = ref }}
                                onChangeText={(formatted) => {
                                    this.setState({ phone: formatted })
                                }}
                                editable={false}
                                keyboardType={"number-pad"}
                                placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Telefon nömrəniz']) : ('')}
                                value={phone}
                                mask={"+994 ([000]) [000] [00] [00]"}
                            />
                        </Item>
                        <TouchableWithoutFeedback onPress={() => NavigationService.navigate('ChangePsw')}>
                            <View style={styles.changePsw} regular>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.pswText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Login']['Şifrə']) : ('')}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                    <Text style={styles.pswText1}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Şəxsi məlumatlar']['Şifrəni Yenilə']) : ('')}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <AwesomeButton onPress={() => this.edit()} width={wp('80%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8" style={styles.btn}>
                            <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Account']['Yadda saxla']) : ('')}</Text>
                        </AwesomeButton>
                    </View>
                </View>
            </Content>
        );
    }

}
const styles = StyleSheet.create({
    infoView: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbnail: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30
    },
    textView: {
        paddingRight: 10,
        paddingLeft: wp('25%')
    },
    formView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 15
    },
    input: {
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    changePsw: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    pswText: {
        paddingLeft: 10
    },
    pswText1: {
        paddingRight: 10,
        color: '#0083E8'
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