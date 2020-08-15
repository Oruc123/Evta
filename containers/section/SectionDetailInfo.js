import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ImageBackground, ScrollView } from 'react-native';
import { View, Text, Content, Title, Left, Body, Right, Icon } from 'native-base';
import NavigationService from '../../components/navigation/NavigationService';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Orientation from 'react-native-orientation';
var ls = require('react-native-local-storage');

export default class SectionDetailInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercise: [],
            lang: '1'
        }
        this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
            this.componentDidMount();
        });
    }

    async componentDidMount() {

        Orientation.lockToPortrait();
        let kid_lang = await ls.get('kid_lang');
        if (kid_lang === '1' || kid_lang === '3') {
            this.setState({ lang: kid_lang });
        }
        this.setState({ exercise: this.props.exercise });

    }


    render() {

        const { exercise, lang } = this.state;

        return (
            <Content style={{ backgroundColor: "#F5F6F8" }}>
                <View style={{ flex: 1 }}>
                    <View style={[styles.view, { backgroundColor: '#0083E8' }]}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <Left style={{ flex: 0.3 }}>
                                <Icon name="ios-arrow-back" style={styles.backIcon} />
                            </Left>
                        </TouchableWithoutFeedback>
                        <Body style={{ flex: 1.3 }}>
                            <Title style={[styles.title, { marginTop: 15 }]}>{this.props.page_title}</Title>
                            <Title style={styles.title}>{this.props.section_title}</Title>
                            <Title style={[styles.title, { marginBottom: 15 }]}>{this.props.title}</Title>
                        </Body>
                        <Right style={{ flex: 0.3 }}></Right>
                    </View>
                    {
                        Object.keys(exercise).map((key, index) =>
                            <View key={key} style={{ flex: 1, marginBottom: 15 }}>
                                <View style={styles.playerView}>
                                    <TouchableWithoutFeedback onPress={() => NavigationService.navigate('VideoPlayer', { id: exercise[key].id, lang: lang })}>
                                        <ImageBackground style={styles.img} source={{ uri: exercise[key].video_image }}>
                                            <TouchableWithoutFeedback onPress={() => NavigationService.navigate('VideoPlayer', { id: exercise[key].id, lang: lang })}>
                                                <Icon name="md-play" style={styles.icon} />
                                            </TouchableWithoutFeedback>
                                        </ImageBackground>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.card}>
                                    <View style={[styles.cardLeft, { backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }]}></View>
                                    <ScrollView style={{ flex: 1 }} horizontal={true}>
                                        <Text style={styles.pageText}>{exercise[key].title[lang]}</Text>
                                    </ScrollView>
                                    {
                                        (this.props.from_page === 'course_info' && exercise[key].has_preview[lang] === true) ?
                                            (
                                                <View style={[styles.pointView, { alignItems: 'flex-end' }]}>
                                                    <Icon name="md-unlock" style={styles.eyeIcon} />
                                                </View>
                                            ) :
                                            (
                                                (this.props.from_page === 'lesson_detail_info') ?
                                                    (
                                                        <View style={styles.pointView}>
                                                            <Text style={styles.pointText}>{exercise[key].profile_point} / {exercise[key].point} xal</Text>
                                                        </View>
                                                    ) : (<View></View>)
                                            )
                                    }
                                </View>
                            </View>
                        )
                    }
                </View>
            </Content>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 15,
        flexDirection: 'row'
    },
    title: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playerView: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
    img: {
        width: null,
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: '#0083E8',
        fontSize: 30
    },
    backIcon: {
        color: '#fff',
        paddingLeft: 15
    },
    eyeIcon: {
        color: '#0083E8',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 10
    },
    card: {
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#d6d6d6',
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
    },
    cardLeft: {
        flex: 0.05,
        borderBottomStartRadius: 5
    },
    pageText: {
        flexShrink: 1,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 10
    },
    pointView: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointText: {
        color: '#0083E8',
        fontWeight: 'bold',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
});