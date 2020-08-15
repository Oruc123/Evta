import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Left, Right, Text, Icon } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import AccordionContent from './AccordionContent';
var ls = require('react-native-local-storage');

export default class AccordionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active_item: null,
            expanded: false,
            updated_height: 0,
            icon_name: 'ios-arrow-down',
            lang: '1'
        }
    }

    openAccordion = (item, expanded) => {
        if (expanded) {
            this.setState({ active_item: item, updated_height: null, expanded: expanded, icon_name: 'ios-arrow-up' })
        } else {
            this.setState({ active_item: item, updated_height: 0, expanded: expanded, icon_name: 'ios-arrow-down' })
        }
    }

    async componentDidMount() {
        let kid_lang = await ls.get('kid_lang');
        if (kid_lang === "3") {
            this.setState({ lang: kid_lang });
        }
    }

    render() {

        const { lang, updated_height, icon_name, expanded } = this.state;
        const { item, pages, title, page_title, section_title, from_page } = this.props;

        return (
            <Card style={styles.panelHolder}>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnStyle} onPress={() => this.openAccordion(item, !expanded)}>
                    <Left style={styles.leftItem}>
                        <Text style={styles.titleText}>{title}</Text>
                    </Left>
                    <Right style={styles.rightItem}>
                        <Icon name={icon_name} style={styles.arrowIcon} />
                    </Right>
                </TouchableOpacity>
                <AccordionContent pages={pages} lang={lang} updated_height={updated_height} page_title={page_title} section_title={section_title} from_page={from_page} />
            </Card>
        );
    }

}
const styles = StyleSheet.create({
    panelHolder: {
        flex: 1,
        borderRadius: 15,
        marginTop: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#fff',
        marginVertical: 5,
        backgroundColor: '#fff'
    },
    btnStyle: {
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftItem: {
        flex: 4,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    titleText: {
        color: '#333',
        fontSize: RFValue(15),
    },
    rightItem: {
        flex: 1,
        paddingRight: 15
    },
    arrowIcon: {
        color: '#0083E8',
        fontSize: 20
    }
});
