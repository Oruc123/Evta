import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Left, Body, Right } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NavigationService from '../../components/navigation/NavigationService';

const LessonCard = (props) => {

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => NavigationService.navigate(props.location, { id: props.id, parts: props.parts, title: props.title, page_title: props.page_title, from_page: props.from_page })}>
                <View style={[styles.card, { marginTop: props.margin_top, marginBottom: props.margin_bottom }]}>
                    <View style={styles.card1}>
                        <View style={styles.textView}>
                            <Text style={[styles.numberText, { fontSize: RFValue(20) }]}>{props.title}</Text>
                            <View style={styles.progressView}>
                                <ProgressBarAnimated
                                    width={wp('82%')}
                                    height={10}
                                    value={parseInt(props.progress)}
                                    style={styles.progressBar}
                                    backgroundColor="#39BD4B"
                                    backgroundColorOnComplete="#39BD4B"
                                />
                            </View>
                            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                                <Left style={{ flex: 2 }}>
                                    <Text style={styles.numberText}>
                                        {(props.profile_point !== null) ? (props.profile_point) : (0)} / {props.point} xal
                                    </Text>
                                </Left>
                                <Body></Body>
                                <Right style={{ flex: 1 }}>
                                    <Text style={styles.percentText}>{(props.progress !== null) ? (props.progress) : (0)} %</Text>
                                </Right>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#0F5D99',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 15
    },
    card1: {
        flex: 1,
        backgroundColor: '#0083E8',
        marginBottom: 5,
        borderRadius: 15
    },
    textView: {
        flex: 1,
        padding: 0
    },
    numberText: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    progressView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressBar: {
        marginLeft: 30,
        marginRight: 30
    },
    percentText: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        marginRight: 15,
        fontWeight: 'bold',
        color: '#fff'
    }
});
export default LessonCard;