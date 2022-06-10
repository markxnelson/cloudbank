import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../UI/Card';

const Investments = (props) => {
    return (
        <Card title="My Investments">
            <View style={styles.row}>
                <View style={styles.cell}><Text>Fidelity</Text></View>
                <View style={styles.cell}><Text style={styles.numbers}>$876,987.56</Text></View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}><Text>E*Trade</Text></View>
                <View style={styles.cell}><Text style={styles.numbers}>$245,045.01</Text></View>
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

export default Investments;