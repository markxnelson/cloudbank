import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../UI/Card';

const CreditCards = (props) => {
    return (
        <Card title="My Credit Cards">
            <View style={styles.row}>
                <View style={styles.cell}><Text>AAdvantage</Text></View>
                <View style={styles.cell}><Text style={styles.numbers}>$1,098.56</Text></View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}><Text>CitiCard</Text></View>
                <View style={styles.cell}><Text style={styles.numbers}>$1,500.00</Text></View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        alignSelf: 'stretch'
    },
    numbers: {
        textAlign: 'right'
    },
});

export default CreditCards;