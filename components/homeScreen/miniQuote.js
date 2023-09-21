import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, PixelRatio , Dimensions} from 'react-native';
import {getRandomQuote} from '../motivationalQuotes/quoteList&Controls'
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MiniQuote = ({navigation}) => { 
    const displayQuote = getRandomQuote()

    return(
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("QuoteScreen")}>       
            <View style={styles.wrapper}>
                <Text style={styles.headerText}>Motivational Quote</Text>
                


                    <View style={styles.quoteWrapper}>
                        <View style={styles.quoteTextWrapper}>
                            <View style={styles.quoteTop}>
                                <FontAwesome5 name="quote-left" size={24} color="#76cccc" />
                            </View>
                                {displayQuote && ( // if displayQuote is not null or undefined. 
                                <Text style={[styles.quoteText]}>{displayQuote[0]}</Text>
                                )}
                            <View style={styles.quoteBottom}>
                                <FontAwesome5 name="quote-right" size={24} color="#76cccc" />
                            </View>
                        </View>

                        <View style={styles.authorWrapper}>
                            {displayQuote && ( // if displayQuote is not null or undefined. 
                            <Text style={styles.authorText}>—  {displayQuote[1]}</Text>
                            )}
                        </View>
                    </View>
            </View> 
        </TouchableOpacity>

    )
}



const fontScale = PixelRatio.getFontScale();    // get pixlel's density
const getFontSize = (size) => size / fontScale; // get 

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#15aeac',
    },
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
        paddingTop: SCREEN_HEIGHT/60,
    },
    headerText: {
        width: '100%',
        textAlign: 'center',
        fontSize: SCREEN_HEIGHT/32,
        fontWeight: '500',
        color: '#dff0ed',
    },
    quoteWrapper: {
        marginTop: SCREEN_HEIGHT/40,
    },
    quoteTextWrapper: {
        height: '81%',
        maxHeight: '90%',
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SCREEN_HEIGHT/50,
        paddingHorizontal: SCREEN_WIDTH/40,
    },
    quoteTop: {
        width: '100%',
        alignItems: 'flex-start'
    },
    quoteText: {
        fontSize: getFontSize(SCREEN_HEIGHT/35),
        color: '#daf6f2',
    },
    quoteBottom: {
        width: '100%',
        alignItems: 'flex-end'
    },
    authorWrapper: {
        alignItems: 'flex-end',
        paddingRight: SCREEN_WIDTH/50,
    },
    authorText: {
        color: '#8bebea',
    },
});

export default MiniQuote; 