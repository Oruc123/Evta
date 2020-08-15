import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Input, Item, Content, Text, Spinner } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AwesomeButton from "react-native-really-awesome-button";
import NavigationService from '../../components/navigation/NavigationService';
import { URL } from '../../components/basic/url';
import showToast from '../../helper/ToastAlert';
import axios from 'axios';
var ls = require('react-native-local-storage');

export default class ChangePswForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: '',
            password: '',
            newPassword: '',
            retypeNewPassword: '',
            lang: '1',
            translations: [],
            btn_progress: false
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

    logout = () => {
        ls.save('token', null);
        ls.save('account', null);
        ls.save('kid_id', null);
        ls.save('kid_name', null);
        ls.save('kid_image', null);
        NavigationService.navigate('Login');
    }

    changePsw = async () => {

        if (this.state.password.trim().length === 0) {
            showToast('Zəhmət olmasa, şifrənizi daxil edin', 'danger');
        } else if (this.state.newPassword.trim().length < 6 || this.state.newPassword.trim().length > 32) {
            showToast('Şifrənizin uzunluğu minimum 6 maksimum 32 simvoldan ibarət olmalıdır', 'danger');
        } else if (this.state.newPassword !== this.state.retypeNewPassword) {
            showToast('Şifrələr eyni deyil', 'danger');
        } else {

            let token = await ls.get('token');
            let account = await ls.get('account');

            this.setState({ token: token, account: account, btn_progress: true });

            axios.post(URL + "api/account/change-password", { ...this.state })
                .then(result => {
                    if (result.data.error === true) {
                        showToast(result.data.message, 'danger');
                        this.setState({ btn_progress: false });
                    } else {
                        showToast(result.data.message, "success");
                        this.setState({ btn_progress: false });
                        this.logout();
                        NavigationService.navigate('Login');
                    }
                }
                )
                .catch(error => showToast("Sistem xətası", "danger"));

        }
    }

    render() {

        const { password, newPassword, retypeNewPassword, lang, translations, btn_progress } = this.state;

        if (btn_progress === false) {
            btn_text = <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Account']['Yadda saxla']) : ('')}</Text>
        } else {
            btn_text = <Spinner color='#fff' />
        }

        return (
            <Content style={{ backgroundColor: '#f8f8f8' }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.formView}>
                        <Item style={styles.input} regular>
                            <Input secureTextEntry={true} placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Şifrəni Yenilə']['Hazırki şifrə']) : ('')} onChangeText={(text) => this.setState({ password: text })} value={password} />
                        </Item>
                        <Item style={styles.input} regular>
                            <Input secureTextEntry={true} placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Şifrəni Yenilə']['Yeni şifrə']) : ('')} onChangeText={(text) => this.setState({ newPassword: text })} value={newPassword} />
                        </Item>
                        <Item style={styles.input} regular>
                            <Input secureTextEntry={true} placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Şifrəni Yenilə']['Yeni şifrə (təkrar)']) : ('')} onChangeText={(text) => this.setState({ retypeNewPassword: text })} value={retypeNewPassword} />
                        </Item>
                        <AwesomeButton onPress={() => this.changePsw()} width={wp('80%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8" style={styles.btn}>
                            {btn_text}
                        </AwesomeButton>
                    </View>
                </View>
            </Content>
        );
    }

}
const styles = StyleSheet.create({
    formView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    },
    input: {
        marginTop: 20,
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