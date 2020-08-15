import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Intro1 from '../containers/intro/Intro1';
import Intro2 from '../containers/intro/Intro2';
import Intro3 from '../containers/intro/Intro3';
import Intro4 from '../containers/intro/Intro4';
import Home from './Home';

import Swiper from 'react-native-swiper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../components/basic/Loading';
import { deviceLanguage } from '../components/basic/device-language';
import { URL } from '../components/basic/url';
import axios from 'axios';
var ls = require('react-native-local-storage');

export default class Intro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            intro_status: null,
            loaded: false,
            lang: '1',
            translations: []
        }
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const intro_status = await ls.get('intro_status');
        this.setState({ intro_status: intro_status });

        let kid_lang = await ls.get('kid_lang');
        axios.get(URL + 'api/dictionary').then(result => this.setState({ translations: result.data.translations }))

        if (kid_lang === null && deviceLanguage === 'ru_RU') {
            this.setState({ lang: '3' });
        }
    };

    render() {

        const { loaded, intro_status, lang, translations } = this.state;

        if (loaded) {
            if (intro_status === 1) {
                return (<Home navigation={this.props.navigation} />);
            }
            return (
                <Swiper style={styles.wrapper}
                    showsButtons={true} loop={false}
                    paginationStyle={{ marginBottom: hp('15%') }}
                    dotColor="#AAE7F3"
                    activeDotColor="#00C9F2">
                    <View style={styles.slide}>
                        <Intro1 text={(typeof translations[lang] !== 'undefined' && translations[lang] !== null) ? (translations[lang]['Intro1']['Uyğun sinif üçün Riyaziyyat paketini əldə et']) : ('')} />
                    </View>
                    <View style={styles.slide}>
                        <Intro2 text={(typeof translations[lang] !== 'undefined' && translations[lang] !== null) ? (translations[lang]['Intro2']['Hər bir bölmə üzrə məsələlərin video təlimatlarını izlə.']) : ('')} />
                    </View>
                    <View style={styles.slide}>
                        <Intro3 text={(typeof translations[lang] !== 'undefined' && translations[lang] !== null) ? (translations[lang]['Intro3']['Hər baxdığın videoya görə xal topla və müxtəlif hədiyyələr qazan.']) : ('')} />
                    </View>
                    <View style={styles.slide}>
                        <Intro4 text={(typeof translations[lang] !== 'undefined' && translations[lang] !== null) ? (translations[lang]['Intro4']['Topladığın xallara əsasən liderlər cədvəlində yüksəl.']) : ('')} />
                    </View>
                </Swiper>
            );
        } else {
            this._bootstrapAsync().then(
                () => {
                    this.setState({ loaded: true })
                }
            )
            return (<Loading />);
        }

    }

}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})