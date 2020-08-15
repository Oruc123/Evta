import React, { Component } from 'react';
import { StyleSheet, Image, StatusBar } from 'react-native';
import { Header, Button, Left, Right, Body, Text, Spinner } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import NavigationService from '../../../components/navigation/NavigationService';
import UserAvatar from 'react-native-user-avatar';
var ls = require('react-native-local-storage');

export default class ProfileHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            lang: '1',
            translations: []
        }
        if (typeof this.props.navigation !== 'undefined') {
            this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
                this.componentDidMount();
            });
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

    render() {

        const { lang, translations } = this.state;
        const { access_sequence, profile_point, kid_name } = this.props;

        return (
            <Header style={styles.header}>
                <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
                <Left style={{ flex: 1 }}>
                    <Button iconLeft style={styles.btn}>
                        <Image source={require('../../../assets/header/rocket.png')} />
                        <Text style={[styles.text, { color: '#FFC145' }]}>{(access_sequence !== null) ? (access_sequence) : (0)} {(typeof translations[lang] !== 'undefined') ? (translations[lang]['Header']['GÜN']) : ('')}</Text>
                    </Button>
                </Left>
                <Body style={{ flex: 1 }}>
                    <Button iconLeft style={styles.btn}>
                        <Image style={{ marginLeft: 15 }} source={require('../../../assets/header/medal.png')} />
                        <Text style={[styles.text, { color: '#8A8A8A' }]}>
                            {(profile_point !== null) ? (profile_point) : (0)} {(typeof translations[lang] !== 'undefined') ? (translations[lang]['Header']['XAL']) : ('')}
                                </Text>
                    </Button>
                </Body>
                <Right style={{ flex: 1 }}>
                    {
                        (kid_name !== '') ?
                            (
                                <Button onPress={() => NavigationService.navigate('Account')} transparent>
                                    <UserAvatar size="40" color="#E0436B" style={styles.thumbnail} name={kid_name} />
                                </Button>
                            )
                            : (<Spinner color='#0083E8' />)
                    }
                </Right>
            </Header>
        );

    }

}
const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff'
    },
    btn: {
        backgroundColor: '#fff',
        elevation: 0
    },
    text: {
        fontSize: RFValue(15)
    },
    thumbnail: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 10
    }
});