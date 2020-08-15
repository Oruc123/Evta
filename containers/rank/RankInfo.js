import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { View, Content, Title, Text, Item, Picker, CardItem, Left, Body, Right, Thumbnail, Icon, CheckBox } from 'native-base';
import AwesomeButton from "react-native-really-awesome-button";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SvgUri from 'react-native-svg-uri';
import Modal from "react-native-modal";
import NavigationService from '../../components/navigation/NavigationService';
var ls = require('react-native-local-storage');

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Platform.OS === "ios" ? Dimensions.get("window").height : 2000;

export default class RankInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
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

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    render() {

        const { isModalVisible, lang, translations } = this.state;

        return (
            <Content style={{ backgroundColor: "#F5F6F8" }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.view}>
                        <Title style={styles.title}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Filter']['Lider sıralaması']) : ('')}</Title>
                    </View>
                    <AwesomeButton onPress={() => this.toggleModal()} width={wp('90%')} borderRadius={10} backgroundColor="#fff" backgroundDarker="#d5d5d5" backgroundShadow="#F8F8F8" style={styles.btn}>
                        <Left></Left>
                        <Body>
                            <Text style={styles.text}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Filter']['Filter']) : ('')}</Text>
                        </Body>
                        <Right>
                            <SvgUri width="25" height="20" style={styles.filterIcon} source={{ uri: 'https://res.cloudinary.com/drbeggxte/image/upload/fl_sanitize/v1566481944/news/filter.svg' }} />
                        </Right>
                    </AwesomeButton>
                    <View style={styles.card}>
                        <CardItem header bordered style={{ borderRadius: 15 }}>
                            <Text style={styles.rankHeader}>Hal hazırda sən <Text style={styles.rankNumber}>5</Text>-ci yerdəsən</Text>
                        </CardItem>
                        <View style={styles.listView}>
                            <View style={styles.listItemView}>
                                <View style={styles.listItemLeft}>
                                    <View style={styles.numberTextView}>
                                        <Text style={styles.numberText}>1</Text>
                                    </View>
                                    <Thumbnail source={{ uri: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg' }} />
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>Kumar Pratik</Text>
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>1060 xal</Text>
                                </View>
                            </View>
                            <View style={styles.listItemView}>
                                <View style={styles.listItemLeft}>
                                    <View style={styles.numberTextView}>
                                        <Text style={styles.numberText}>2</Text>
                                    </View>
                                    <Thumbnail source={{ uri: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg' }} />
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>Kumar Pratik</Text>
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>1060 xal</Text>
                                </View>
                            </View>
                            <View style={styles.listItemView}>
                                <View style={styles.listItemLeft}>
                                    <View style={styles.numberTextView}>
                                        <Text style={styles.numberText}>3</Text>
                                    </View>
                                    <Thumbnail source={{ uri: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg' }} />
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>Kumar Pratik</Text>
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>1060 xal</Text>
                                </View>
                            </View>
                            <View style={styles.listItemView}>
                                <View style={styles.listItemLeft}>
                                    <View style={styles.numberTextView}>
                                        <Text style={styles.numberText}>4</Text>
                                    </View>
                                    <Thumbnail source={{ uri: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg' }} />
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>Kumar Pratik</Text>
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>1060 xal</Text>
                                </View>
                            </View>
                            <View style={styles.listItemView}>
                                <View style={styles.listItemLeft}>
                                    <View style={styles.numberTextView}>
                                        <Text style={styles.numberText}>5</Text>
                                    </View>
                                    <Thumbnail source={{ uri: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg' }} />
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>Kumar Pratik</Text>
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>1060 xal</Text>
                                </View>
                            </View>
                            <View style={styles.listItemView}>
                                <View style={styles.listItemLeft}>
                                    <View style={styles.numberTextView}>
                                        <Text style={styles.numberText}>6</Text>
                                    </View>
                                    <Thumbnail source={{ uri: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg' }} />
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>Kumar Pratik</Text>
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>1060 xal</Text>
                                </View>
                            </View>
                            <View style={styles.listItemView}>
                                <View style={styles.listItemLeft}>
                                    <View style={styles.numberTextView}>
                                        <Text style={styles.numberText}>7</Text>
                                    </View>
                                    <Thumbnail source={{ uri: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg' }} />
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>Kumar Pratik</Text>
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>1060 xal</Text>
                                </View>
                            </View>
                            <View style={styles.listItemView}>
                                <View style={styles.listItemLeft}>
                                    <View style={styles.numberTextView}>
                                        <Text style={styles.numberText}>8</Text>
                                    </View>
                                    <Thumbnail source={{ uri: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg' }} />
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>Kumar Pratik</Text>
                                </View>
                                <View style={styles.nameRankView}>
                                    <Text>1060 xal</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {(isModalVisible) ? <Modal
                    style={{ flex: 1, marginBottom: hp('50%') }}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    backdropColor="#abacac" backdropOpacity={0.90}
                    isVisible={isModalVisible}
                    onBackdropPress={() => this.toggleModal()}>
                    <View style={styles.modalStyle}>
                        <View style={styles.moadlHeaderView}>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.text, styles.modalHeaderText]}>Filter</Text>
                            </View>
                            <View style={styles.modalIcon}>
                                <SvgUri width="25" height="20" source={{ uri: 'https://res.cloudinary.com/drbeggxte/image/upload/fl_sanitize/v1566481944/news/filter.svg' }} />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Item style={[styles.input, styles.schoolItem]} regular>
                                <View style={{ flex: 1 }}>
                                    <Text>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Məktəb']) : ('')}</Text>
                                </View>
                                <View style={styles.checkBoxView}>
                                    <CheckBox style={styles.checkBoxIcon} checked={true} />
                                </View>
                            </Item>
                            <Item style={styles.input} picker regular>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholder={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Rayon']) : ('')}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                >
                                    <Picker.Item label={(typeof translations[lang] !== 'undefined') ? (translations[lang]['Signup']['Rayon']) : ('')} value="key0" />
                                    <Picker.Item label="ATM Card" value="key1" />
                                    <Picker.Item label="Debit Card" value="key2" />
                                    <Picker.Item label="Credit Card" value="key3" />
                                    <Picker.Item label="Net Banking" value="key4" />
                                </Picker>
                            </Item>
                            <Item style={styles.input} picker regular>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholder="Fən"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                >
                                    <Picker.Item label="Fən" value="key0" />
                                    <Picker.Item label="ATM Card" value="key1" />
                                    <Picker.Item label="Debit Card" value="key2" />
                                    <Picker.Item label="Credit Card" value="key3" />
                                    <Picker.Item label="Net Banking" value="key4" />
                                </Picker>
                            </Item>
                            <AwesomeButton width={wp('80%')} borderRadius={10} backgroundColor="#3ECC52" backgroundDarker="#3D8347" backgroundShadow="#F8F8F8" style={[styles.btn, { marginTop: hp('3%') }]} onPress={() => NavigationService.navigate('Signup')}>
                                <Text style={styles.btnText}>{(typeof translations[lang] !== 'undefined') ? (translations[lang]['Account']['Yadda saxla']) : ('')}</Text>
                            </AwesomeButton>
                        </View>
                    </View>
                </Modal> : null}
            </Content>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        margin: 20,
        backgroundColor: '#0083E8',
        borderRadius: 15
    },
    title: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    btn: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 2
    },
    btnText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#fff'
    },
    text: {
        color: '#0083E8',
        fontWeight: 'bold'
    },
    filterIcon: {
        marginRight: 10
    },
    card: {
        flex: 1,
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 15
    },
    rankHeader: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#333'
    },
    rankNumber: {
        fontSize: 30,
        color: '#0083E8'
    },
    listView: {
        paddingTop: 20,
        paddingBottom: 20
    },
    listItemView: {
        marginTop: 10,
        flexDirection: 'row'
    },
    listItemLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberTextView: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: -5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomLeftRadius: 15,
        borderTopStartRadius: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#0F5D99',
        backgroundColor: '#0083E8'
    },
    numberText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    nameRankView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalStyle: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    moadlHeaderView: {
        flex: 0.15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8'
    },
    modalHeaderText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    modalIcon: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: hp('3%')
    },
    input: {
        marginTop: hp('3%'),
        marginRight: hp('3%'),
        marginLeft: hp('3%'),
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    schoolItem: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    checkBoxView: {
        flex: 1,
        alignItems: 'flex-end'
    },
    checkBoxIcon: {
        marginRight: 20
    }
});