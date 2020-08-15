import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input, Item, Icon, Picker } from 'native-base';
import AwesomeButton from "react-native-really-awesome-button";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioForm from 'react-native-simple-radio-button';
import Loading from '../../components/basic/Loading';
import { URL } from '../../components/basic/url';
import showToast from '../../helper/ToastAlert';
import axios from 'axios';
var ls = require('react-native-local-storage');

var radio_props_az = [
    {
        "id": "23",
        "value": "Kişi"
    },
    {
        "id": "24",
        "value": "Qadın"
    }
];

var radio_props_ru = [
    {
        "id": "23",
        "value": "Мужчина"
    },
    {
        "id": "24",
        "value": "Женщина"
    }
];

export default class SettingsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: '',
            dictionary: [],
            school_list: [],
            profile: '',
            name: '',
            fk_class: '',
            fk_lang: '',
            fk_city: '',
            fk_school: '',
            fk_gender: '',
            day: '',
            month: '',
            year: '',
            birthdate: '',
            isLoading: true,
            lang: '1',
            translations: []
        }
    }

    async componentDidMount() {
        let token = await ls.get('token');
        let account = await ls.get('account');
        let kid_id = await ls.get('kid_id');

        let kid_lang = await ls.get('kid_lang');
        let translations = await ls.get('translations');
        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        }
        this.setState({ translations: translations });

        jsonObj = {
            token: token,
            account: account,
            profile: kid_id
        }

        this.getProfileInfo(jsonObj);
        this.getDictionary();
        this.getSchoolList(this.state.fk_city);
    }

    getDictionary = () => {
        axios.get(URL + 'api/dictionary').then(result => this.setState({ dictionary: result.data }))
    }

    getSchoolList = (id) => {
        axios.get(URL + 'api/dictionary/school/' + id).then(result => this.setState({ school_list: result.data.school }))
    }

    getProfileInfo = (jsonObj) => {
        this.setState({ isLoading: true });
        axios.post(URL + "api/account/profile/info", jsonObj)
            .then(result => {
                this.setState({
                    name: result.data.result.name, fk_city: result.data.result.fk_city, fk_school: result.data.result.fk_school,
                    fk_gender: result.data.result.fk_gender, fk_lang: result.data.result.fk_lang, fk_class: result.data.result.fk_class, isLoading: false
                });
                if(result.data.result.birthdate !== null){
                    this.setState({ birthdate: result.data.result.birthdate, day: result.data.result.birthdate.slice(8, 10), month: result.data.result.birthdate.slice(5, 7),
                        year: result.data.result.birthdate.slice(0, 4) });
                }
                this.getSchoolList(result.data.result.fk_city);
            }
            )
            .catch(error => console.log(error));
    }

    editProfile = async () => {

        if (this.state.name.trim().length === 0) {
            showToast('Zəhmət olmasa, Şagirdin ad soyadını daxil edin', 'danger');
        } else if (this.state.fk_class.trim().length === 0) {
            showToast('Zəhmət olmasa, Şagirdin sinifini daxil edin', 'danger');
        } else if (this.state.fk_lang.trim().length === 0) {
            showToast('Zəhmət olmasa, Şagirdin sektorunu daxil edin', 'danger');
        } else if (this.state.fk_city.trim().length === 0) {
            showToast('Zəhmət olmasa, Şəhəri daxil edin', 'danger');
        } else if (this.state.fk_school.trim().length === 0) {
            showToast('Zəhmət olmasa, Məktəbi daxil edin', 'danger');
        } else if (this.state.day.trim().length === 0 && this.state.month.trim().length === 0 && this.state.year.trim().length === 0) {
            showToast('Zəhmət olmasa, Doğum tarixini daxil edin', 'danger');
        } else {

            let token = await ls.get('token');
            let account = await ls.get('account');
            let kid_id = await ls.get('kid_id');

            jsonObj = {
                token: token,
                account: account,
                profile: kid_id,
                fk_lang: this.state.fk_lang,
                fk_city: this.state.fk_city,
                fk_school: this.state.fk_school,
                fk_gender: this.state.fk_gender,
                fk_class: this.state.fk_class,
                name: this.state.name,
                birthdate: this.state.day + "." + this.state.month + "." + this.state.year
            }

            axios.post(URL + "api/account/profile/update", jsonObj)
                .then(result => {
                    if (result.data.error === true) {
                        showToast(result.data.message, 'danger');
                    } else {
                        showToast(result.data.message, "success");
                        ls.save('kid_name', this.state.name);
                        ls.save('kid_lang', this.state.fk_lang);
                    }
                }
                )
                .catch(error => showToast("Sistem xətası", "danger"));

        }
    }

    render() {

        const { isLoading, fk_gender, name, dictionary, month, day, year, fk_class, fk_lang, fk_city, fk_school, school_list, lang, translations } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        if (fk_gender.length > 0) {
            initial_gender = parseInt(fk_gender) - 23;
        } else {
            initial_gender = 0;
        }

        return (
            <View style={styles.formView}>
                <Item style={styles.input} regular>
                    <Input placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Şagirdin adı']) : ('')} onChangeText={(text) => this.setState({ name: text })} value={name} />
                </Item>
                <View style={styles.radioViewStyle}>
                    <Text style={styles.genderText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Cinsi']) : ('')}:</Text>
                    <RadioForm
                        radio_props={(lang === '1' ? radio_props_az : radio_props_ru)}
                        formHorizontal={true}
                        buttonColor={'#0083E8'}
                        selectedButtonColor={'#0083E8'}
                        style={styles.radioBtn}
                        initial={initial_gender}
                        onPress={(value) => { this.setState({ fk_gender: value }) }}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Item style={[styles.input, { marginRight: 15 }]} picker regular>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Gün']) : ('')}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={day}
                                onValueChange={(value) => this.setState({ day: value })}
                            >
                                <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Gün']) : ('')} value="" />
                                <Picker.Item label="1" value="01" />
                                <Picker.Item label="2" value="02" />
                                <Picker.Item label="3" value="03" />
                                <Picker.Item label="4" value="04" />
                                <Picker.Item label="5" value="05" />
                                <Picker.Item label="6" value="06" />
                                <Picker.Item label="7" value="07" />
                                <Picker.Item label="8" value="08" />
                                <Picker.Item label="9" value="09" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                                <Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" />
                                <Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" />
                                <Picker.Item label="30" value="30" />
                                <Picker.Item label="31" value="31" />
                            </Picker>
                        </Item>
                    </View>
                    <View style={{ flex: 1.5 }}>
                        <Item style={[styles.input, { marginRight: 15 }]} picker regular>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Ay']) : ('')}
                                placeholderStyle={{ color: '#39BD4B' }}
                                placeholderIconColor='#39BD4B'
                                selectedValue={month}
                                onValueChange={(value) => this.setState({ month: value })}
                            >
                                <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Ay']) : ('')} value="" />
                                <Picker.Item label="Yanvar" value="01" />
                                <Picker.Item label="Fevral" value="02" />
                                <Picker.Item label="Mart" value="03" />
                                <Picker.Item label="Aprel" value="04" />
                                <Picker.Item label="May" value="05" />
                                <Picker.Item label="İyun" value="06" />
                                <Picker.Item label="İyul" value="07" />
                                <Picker.Item label="Avqust" value="08" />
                                <Picker.Item label="Sentyabr" value="09" />
                                <Picker.Item label="Oktyabr" value="10" />
                                <Picker.Item label="Noyabr" value="11" />
                                <Picker.Item label="Dekabr" value="12" />
                            </Picker>
                        </Item>
                    </View>
                    <View style={{ flex: 1.2 }}>
                        <Item style={styles.input} picker regular>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['İl']) : ('')}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={year}
                                onValueChange={(value) => this.setState({ year: value })}
                            >
                                <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['İl']) : ('')} value="" />
                                <Picker.Item label="2007" value="2007" />
                                <Picker.Item label="2008" value="2008" />
                                <Picker.Item label="2009" value="2009" />
                                <Picker.Item label="2010" value="2010" />
                                <Picker.Item label="2011" value="2011" />
                                <Picker.Item label="2012" value="2012" />
                                <Picker.Item label="2013" value="2013" />
                                <Picker.Item label="2014" value="2014" />
                            </Picker>
                        </Item>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Item style={[styles.input, { marginRight: 15 }]} picker regular>
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
                <Item style={styles.input} picker regular>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Rayon']) : ('')}
                        placeholderStyle={{ color: '#39BD4B' }}
                        placeholderIconColor='#39BD4B'
                        selectedValue={fk_city}
                        onValueChange={(value) => { this.setState({ fk_city: value }); this.getSchoolList(value); }}
                    >
                        <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Rayon']) : ('')} value="" />
                        {(typeof dictionary.school !== 'undefined') ?
                            (dictionary.school.map(c =>
                                <Picker.Item key={c.id} label={c.value} value={c.id} />
                            )) : (
                                <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Rayon']) : ('')} value="" />
                            )}
                    </Picker>
                </Item>
                <Item style={styles.input} picker regular>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Məktəb']) : ('')}
                        placeholderStyle={{ color: '#39BD4B' }}
                        placeholderIconColor='#39BD4B'
                        selectedValue={fk_school}
                        onValueChange={(value) => this.setState({ fk_school: value })}
                    >
                        {(typeof school_list !== 'undefined') ? (school_list.filter(s => s.id === fk_school).map(s =>
                            <Picker.Item key={s.id} label={s.value} value={s.id} />
                        )) : (<Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Məktəb']) : ('')} value="" />)
                        }
                        {(typeof school_list !== 'undefined') ?
                            (school_list.map(s =>
                                <Picker.Item key={s.id} label={s.value} value={s.id} />
                            )) : (
                                <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Məktəb']) : ('')} value="" />
                            )}
                    </Picker>
                </Item>
                <AwesomeButton onPress={() => this.editProfile()} width={wp('80%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8" style={styles.btn}>
                    <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Account']['Yadda saxla']) : ('')}</Text>
                </AwesomeButton>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    formView: {
        flex: 1,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20
    },
    successRow: {
        flexDirection: 'row'
    },
    img: {
        width: null,
        height: 120,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 5,
        borderRadius: 10
    },
    textView: {
        paddingRight: 10,
        paddingLeft: 10
    },
    title: {
        color: '#333',
        fontWeight: 'bold',
        marginTop: 20
    },
    noteText: {
        color: '#adadad',
        marginBottom: 7
    },
    input: {
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    radioViewStyle: {
        paddingTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    genderText: {
        marginTop: hp('1.5%')
    },
    radioBtn: {
        marginTop: 10,
        marginLeft: hp('5%')
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