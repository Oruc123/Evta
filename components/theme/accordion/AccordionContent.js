import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Icon } from 'native-base';
import NavigationService from '../../navigation/NavigationService';

const AccordionContent = (props) => {

    return (
        <View style={{ flex: 1, height: props.updated_height }}>
            {
                Object.keys(props.pages).map((key, index) =>
                    (props.from_page === 'course_info' && props.pages[key].has_preview[props.lang] === true) ?
                        (
                            <TouchableWithoutFeedback key={key}
                                onPress={() => NavigationService.navigate('SectionDetail',
                                    {
                                        exercise: props.pages[key].exercise, page_title: props.page_title,
                                        section_title: props.section_title, from_page: props.from_page,
                                        title: props.pages[key].title[props.lang]
                                    }
                                )}>
                                <View style={styles.card}>
                                    <View style={[styles.cardLeft, { backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }]}></View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.pageText}>{props.pages[key].title[props.lang]}</Text>
                                    </View>
                                    <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                                        <Icon name="md-unlock" style={styles.eyeIcon} />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ) :
                        (
                            props.from_page === 'lesson_detail_info' ?
                                <TouchableWithoutFeedback key={key}
                                    onPress={() => NavigationService.navigate('SectionDetail',
                                        {
                                            exercise: props.pages[key].exercise, page_title: props.page_title,
                                            section_title: props.section_title, from_page: props.from_page,
                                            title: props.pages[key].title[props.lang]
                                        }
                                    )}>
                                    <View style={styles.card}>
                                        <View style={[styles.cardLeft, { backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }]}></View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.pageText}>{props.pages[key].title[props.lang]}</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={styles.pointText}>{props.pages[key].profile_point} / {props.pages[key].point} xal</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <View style={styles.card}>
                                    <View style={[styles.cardLeft, { backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }]}></View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.pageText}>{props.pages[key].title[props.lang]}</Text>
                                    </View>
                                </View>
                        )
                )
            }
            <Text>{`\n`}</Text>
        </View>
    );

}
const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        borderColor: '#d6d6d6',
        flexDirection: 'row',
        height: 40,
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5
    },
    cardLeft: {
        flex: 0.05,
        borderTopStartRadius: 5,
        borderBottomStartRadius: 5
    },
    eyeIcon: {
        color: '#0083E8',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 10
    },
    pageText: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 10
    },
    pointText: {
        color: '#0083E8',
        fontWeight: 'bold',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
});
export default AccordionContent;