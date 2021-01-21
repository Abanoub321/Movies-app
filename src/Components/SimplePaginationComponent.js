import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {rowDetail} from '../styles';

const PaginationComponent = ({pressNext,pressPrev,pageNo,noOfPages}) => {
    return (
        <View style={rowDetail}>
            <TouchableOpacity style={styles.buttonContainer} onPress={pressPrev} disabled={pageNo==1}>
                <Text>Previous</Text>
            </TouchableOpacity>

            <Text style={styles.textStyle}>{pageNo}</Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={pressNext} disabled={pageNo==noOfPages}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonContainer :{
        backgroundColor:'#f4511e',
        borderRadius:15,
        padding:15,
        marginBottom:5
    },
    textStyle:{
        fontSize:20
    }
});
export { PaginationComponent };