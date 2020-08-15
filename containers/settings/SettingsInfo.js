import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { View, Card, Text, ListItem, List } from 'native-base';
import NavigationService from '../../components/navigation/NavigationService';
import AwesomeButton from "react-native-really-awesome-button";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var ls = require('react-native-local-storage');

export default class SettingsInfo extends Component {

    constructor(props){
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
        this.setState({translations: translations});

    }

    logout = () => {
        ls.save('token', null);
        ls.save('account', null);
        ls.save('kid_id', null);
        ls.save('kid_name', null);
        ls.save('kid_image', null);
        ls.save('kid_lang', null);
        ls.save('profile_point', null);
        this.forceUpdate();
        NavigationService.navigate('Login');
    }

    render() {

        const { lang, translations } = this.state;

        return (
            <View style={styles.view}>
                <Card style={styles.listView}>
                    <List>
                        <ListItem onPress={() => NavigationService.navigate('AccountEdit')}>
                            <Text>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Settings']['Şəxsi məlumatlar']) : ('')}</Text>
                        </ListItem>
                        <ListItem onPress={() => NavigationService.navigate('CreateProfile')}>
                            <Text>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Settings']['Şagirdlərin idarə edilməsi']) : ('')}</Text>
                        </ListItem>
                        <ListItem onPress={() => NavigationService.navigate('Balance')}>
                            <Text>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Balans']['Balans']) : ('')}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Settings']['Mobil tətbiqi qiymətləndir']) : ('')}</Text>
                        </ListItem>
                        <ListItem onPress={() => Linking.openURL("https://evta.az/")}>
                            <Text>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Settings']['Əlaqə']) : ('')}</Text>
                        </ListItem>
                    </List>
                </Card>
                <AwesomeButton onPress={() => this.logout()} width={wp('70%')} borderRadius={10} backgroundColor="#fff" backgroundDarker="#c6c6c6" backgroundShadow="#F8F8F8" style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Settings']['ÇIXIŞ']) : ('')}</Text>
                </AwesomeButton>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20
    },
    cardView: {
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    listView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden'
    },
    icon: {
        fontSize: 25,
        color: '#333'
    },
    logoutBtn: {
        alignSelf: 'center',
        marginBottom: 10,
        position: 'absolute',
        bottom: 0
    },
    logoutText: {
        color: '#E0436B',
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold'
    }
});