import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Input, Picker, Item, Content, Text, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AwesomeButton from "react-native-really-awesome-button";
import RadioForm from 'react-native-simple-radio-button';
import { URL } from '../../components/basic/url';
import showToast from '../../helper/ToastAlert';
import SearchableDropdown from 'react-native-searchable-dropdown';
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

export default class CreateProfileForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: '',
            dictionary: [],
            school_list: [],
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
        this.getDictionary();
    }

    getDictionary = () => {
        axios.get(URL + 'api/dictionary').then(result => this.setState({ dictionary: result.data }))
    }

    getSchoolList = (id) => {
        axios.get(URL + 'api/dictionary/school/' + id).then(result => this.setState({ school_list: result.data.school }))
    }

    createProfile = async () => {

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
        } else if (this.state.fk_gender.trim().length === 0) {
            showToast('Zəhmət olmasa, Şagirdin cinsini daxil edin', 'danger');
        } else {

            let token = await ls.get('token');
            let account = await ls.get('account');

            jsonObj = {
                token: token,
                account: account,
                fk_lang: this.state.fk_lang,
                fk_city: this.state.fk_city,
                fk_school: this.state.fk_school,
                fk_gender: this.state.fk_gender,
                fk_class: this.state.fk_class,
                name: this.state.name,
                birthdate: this.state.day + "." + this.state.month + "." + this.state.year
            }

            axios.post(URL + "api/account/profile/register", jsonObj)
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

        const { name, dictionary, school_list, fk_class, fk_lang, fk_city, fk_school, day, month, year, lang, translations } = this.state;

        return (
            <Content style={{ backgroundColor: '#f8f8f8' }}>
                <View style={{ flex: 1 }}>
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
                                initial={3}
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
                            <View style={{ flex: 1 }}>
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
                        {(typeof dictionary.school !== 'undefined') ?
                            (<SearchableDropdown
                                onTextChange={text => console.log(text)}
                                onItemSelect={item => { this.setState({ fk_city: item.id }); this.getSchoolList(item.id); }}
                                containerStyle={styles.cityList}
                                textInputStyle={styles.cityDropdown}
                                itemStyle={styles.cityItem}
                                itemTextStyle={{ color: '#222' }}
                                items={dictionary.school}
                                placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Rayon']) : ('')}
                                resetValue={false}
                                underlineColorAndroid="transparent"
                            />) : (
                                <Text></Text>
                            )}
                        <Item style={styles.input} picker regular>
                            {
                                (fk_city.trim().length > 0) ?
                                    (
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Məktəb']) : ('')}
                                            placeholderStyle={{ color: '#39BD4B' }}
                                            placeholderIconColor='#39BD4B'
                                            selectedValue={fk_school}
                                            onValueChange={(value) => this.setState({ fk_school: value })}
                                        >
                                            <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Məktəb']) : ('')} value="" />
                                            {(typeof school_list !== 'undefined') ?
                                                (school_list.map(s =>
                                                    <Picker.Item key={s.id} label={s.value} value={s.id} />
                                                )) : (
                                                    <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Məktəb']) : ('')} value="" />
                                                )}
                                        </Picker>
                                    ) : (<Text style={styles.schoolText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Məktəb']) : ('')}</Text>)
                            }
                        </Item>
                        <AwesomeButton onPress={() => this.createProfile()} width={wp('80%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8" style={styles.btn}>
                            <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Account']['Yadda saxla']) : ('')}</Text>
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
    cityDropdown: {
        marginTop: hp('3%'),
        borderRadius: 5,
        borderWidth: 0.21,
        borderColor: '#222',
        backgroundColor: '#fff',
    },
    cityItem: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF9F8',
        borderColor: '#333',
        borderWidth: 1,
    },
    cityList: {
        borderColor: '#333'
    },
    schoolText: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10
    },
    radioViewStyle: {
        paddingTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    genderText: {
        marginTop: hp('1.7%')
    },
    calendarView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        borderColor: '#333',
        backgroundColor: '#fff'
    },
    icon: {
        paddingTop: 5,
        paddingLeft: 10
    },
    radioBtn: {
        marginTop: hp('1.5%'),
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