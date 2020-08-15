import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Content, Card, Text, Left, Right } from 'native-base';
import PurchaseInfo from './PurchaseInfo';
import { RFValue } from 'react-native-responsive-fontsize';

export default class BalanceAccordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active_item: null,
            expanded: false,
            updated_height: 0
        }
    }

    openAccordion = (item, expanded) => {
        if (expanded) {
            this.setState({ active_item: item, updated_height: null, expanded: expanded })
        } else {
            this.setState({ active_item: item, updated_height: 0, expanded: expanded })
        }
    }

    render() {

        const { updated_height, expanded } = this.state;
        const { item, title, amount, balance, balance_new, action, date } = this.props;

        return (
            <Content>
                <View style={styles.view}>
                    <Card style={styles.panelHolder}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.btnStyle} onPress={() => this.openAccordion(item, !expanded)}>
                            <Left style={styles.leftItem}>
                                <Text style={styles.titleText}>{title}</Text>
                            </Left>
                            <Right style={styles.rightItem}>
                                {
                                    (action === 'out') ? (<Text style={[styles.priceText, { color: '#E0436B' }]}> - {amount} AZN</Text>)
                                        : (<Text style={[styles.priceText, { color: '#3ECC52' }]}> + {amount} AZN</Text>)
                                }
                            </Right>
                        </TouchableOpacity>
                        <PurchaseInfo updated_height={updated_height} balance={balance} balance_new={balance_new} action={action} date={date} />
                    </Card>
                </View>
            </Content>
        );
    }

}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    panelHolder: {
        flex: 1,
        borderRadius: 15,
        marginTop: 10,
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
        flex: 2,
        paddingRight: 15
    },
    priceText: {
        fontSize: RFValue(13),
        fontWeight: 'bold'
    }
});