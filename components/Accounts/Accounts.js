import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../UI/Card';

const Accounts = (props) => {
    return (
        <Card title="My Accounts" onPress={() => props.navigation.navigate('AccountDetail')} >
            <View style={styles.row}>
                <View style={styles.cell}><Text>Checking</Text></View>
                <View style={styles.cell}><Text style={styles.numbers}>$1,234.56</Text></View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}><Text>Savings</Text></View>
                <View style={styles.cell}><Text style={styles.numbers}>$56,789.01</Text></View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}><Text>Investment</Text></View>
                <View style={styles.cell}><Text style={styles.numbers}>$2,345.67</Text></View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}><Text>Mortgage</Text></View>
                <View style={styles.cell}><Text style={styles.numbers}>$252,678.98</Text></View>
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

export default Accounts;