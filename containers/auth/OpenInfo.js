import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Image, BackHandler } from 'react-native';
import { Content, View, Text } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import AwesomeButton from "react-native-really-awesome-button";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NavigationService from '../../components/navigation/NavigationService';
import { deviceLanguage } from '../../components/basic/device-language';
import Loading from '../../components/basic/Loading';
var ls = require('react-native-local-storage');

export default class OpenInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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

        this.setState({ translations: translations, isLoading: false });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        NavigationService.navigate('Home');
        return true;
    }

    render() {

        const { isLoading, lang, translations } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <Content contentContainerStyle={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                    <ImageBackground resizeMode="stretch" source={require('../../assets/auth/open_info.jpg')} style={styles.imageBackground}>
                        <View style={{ flex: 0.5 }}></View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image resizeMode="contain" source={require('../../assets/header/evta.png')} style={styles.logo} />
                            </View>
                            <AwesomeButton width={wp('80%')} borderRadius={10} backgroundColor="#0083E8" backgroundDarker="#0F5D99" backgroundShadow="#F8F8F8" style={[styles.btn, { marginTop: hp('8%') }]} onPress={() => NavigationService.navigate('Login')}>
                                <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Open']['Daxil ol']) : ('')}</Text>
                            </AwesomeButton>
                            <AwesomeButton width={wp('80%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8" style={[styles.btn, { marginTop: hp('3%') }]} onPress={() => NavigationService.navigate('Signup')}>
                                <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Open']['Qeydiyyatdan keç']) : ('')}</Text>
                            </AwesomeButton>
                        </View>
                        <View style={{ flex: 1 }}>
                        </View>
                    </ImageBackground>
                </View>
            </Content>
        );

    }

}
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    logo: {
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 120,
        height: 40,
    },
    text: {
        fontSize: RFValue(50),
        fontWeight: 'bold',
        textAlign: "center",
        margin: 10,
        color: '#E0436B'
    },
    btnText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff'
    },
    btn: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});