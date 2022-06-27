import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../UI/Card';

const AccountDetail = (props) => {
    return (
        <ScrollView style={styles.main}>
            <Card title={"My Checking Account : " + props.accountNumber}>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>6/27/2022</Text></View>
                    <View style={styles.widecell}><Text>Deposit</Text></View>
                    <View style={styles.cell}><Text style={styles.numbers}>$100.00</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>6/27/2022</Text></View>
                    <View style={styles.widecell}><Text>Transfer to account 123</Text></View>
                    <View style={styles.cell}><Text style={styles.numbers}>$50.00</Text></View>
                </View>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 10
    },
    row: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        alignSelf: 'stretch'
    },
   widecell: {
        flex: 3,
        alignSelf: 'stretch'
    },
    numbers: {
        textAlign: 'right'
    },
});

export default AccountDetail;