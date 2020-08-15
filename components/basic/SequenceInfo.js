import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { deviceLanguage } from './device-language';
import NavigationService from '../navigation/NavigationService';
import AwesomeButton from "react-native-really-awesome-button";
import Confetti from 'react-native-confetti';
var ls = require('react-native-local-storage');

export default class SequenceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: '1'
        }
    }

    async componentDidMount() {

        let kid_lang = await ls.get('kid_lang');

        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        } else if (kid_lang === null && deviceLanguage === 'ru_RU') {
            this.setState({ lang: '3' });
        }

    }

    componentDidMount() {
        if (this._confettiView) {
            this._confettiView.startConfetti();
        }
    }

    componentWillUnmount() {
        if (this._confettiView) {
            this._confettiView.stopConfetti();
        }
    }

    render() {

        const { lang } = this.state;

        return (
            <View style={styles.container}>
                <Confetti confettiCount={500} ref={(node) => this._confettiView = node} />
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 2, alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    <Image style={styles.image} source={require('../../assets/other/confetti_popper.png')} />
                    <Text style={styles.text}>{this.props.navigation.getParam('access_sequence')} əlavə</Text>
                    <Text style={styles.pointNumber}>{this.props.navigation.getParam('point_addition')}</Text>
                    <Text style={styles.text}>xal qazandınız</Text>
                    <AwesomeButton style={styles.btn} width={wp('50%')} borderRadius={10} backgroundColor="#0083E8" backgroundDarker="#0F5D99" backgroundShadow="#F8F8F8" onPress={() => NavigationService.navigate('Home')}>
                        <Text style={styles.btnText}>{lang === '1' ? 'Davam et' : 'Продолжение'}</Text>
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
        backgroundColor: '#fff'
    },
    image: {
        width: 100,
        height: 100
    },
    btnText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff'
    },
    text: {
        color: '#333',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 'auto',
        paddingBottom: 'auto',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 20
    },
    pointNumber: {
        fontSize: 30,
        color: '#0083E8',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btn: {
        marginTop: 20
    }
});