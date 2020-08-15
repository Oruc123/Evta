import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NavigationService from '../../components/navigation/NavigationService';
import AwesomeButton from "react-native-really-awesome-button";
var ls = require('react-native-local-storage');

export default class Empty extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    }

    render() {

        const { lang, translations } = this.state;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 2, alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    <Image style={styles.image} source={require('../../assets/other/backpack.png')} />
                    <Text style={styles.text}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Hal hazırda heç bir dərslik alınmamışdır']) : ('')}</Text>
                    <AwesomeButton width={wp('50%')} borderRadius={10} backgroundColor="#0083E8" backgroundDarker="#0F5D99" backgroundShadow="#F8F8F8" onPress={() => NavigationService.navigate('Home')}>
                        <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Dərsliklərə bax']) : ('')}</Text>
                    </AwesomeButton>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8'
    },
    image: {
        width: 130,
        height: 150
    },
    btnText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff'
    },
    text: {
        color: '#8A8A8A',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 25
    }
});