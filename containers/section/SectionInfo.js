import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { View, Content, Title, Left, Body, Right, Icon } from 'native-base';
import AccordionList from '../../components/theme/accordion/AccordionList';
var ls = require('react-native-local-storage');

export default class SectionInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: '1'
        }
    }

    async componentDidMount() {
        let kid_lang = await ls.get('kid_lang');
        if(kid_lang === '1' || kid_lang === '3'){
            this.setState({ lang: kid_lang });
        }
    }

    render() {
        
        const { lang } = this.state;

        return (
            <Content style={{ backgroundColor: "#F5F6F8" }} contentContainerStyle={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flexGrow: 1 }}>
                        <View style={[styles.view, { backgroundColor: '#0083E8' }]}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()} >
                                <Left style={{ flex: 0.3 }}>
                                    <Icon name="ios-arrow-back" style={[styles.icon, { paddingLeft: 15 }]} />
                                </Left>
                            </TouchableWithoutFeedback>
                            <Body style={{ flex: 1.3 }}>
                                <Title style={[styles.title, { marginTop: 15 }]}>{this.props.page_title}</Title>
                                <Title style={[styles.title, { marginBottom: 15 }]}>{this.props.title}</Title>
                            </Body>
                            <Right style={{ flex: 0.3 }}></Right>
                        </View>
                        <View style={styles.container}>
                            {Object.keys(this.props.parts).map((item, key) =>
                                <AccordionList key={key} title={this.props.parts[item].title[lang]} id={this.props.parts[item].id} page_title={this.props.page_title} from_page={this.props.from_page} section_title={this.props.title} pages={this.props.parts[item].page} item={item} />
                            )}
                        </View>
                    </ScrollView>
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
    icon: {
        color: '#fff'
    },
    title: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5F7F6',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 5,
    },
    continueText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#E0436B'
    }
});