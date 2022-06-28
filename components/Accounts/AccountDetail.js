import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../UI/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency } from "react-native-format-currency";

const getHistory = async (parseAddress, accountNum) => {
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    console.log("in getHistory() and parse address is " + parseAddress)
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';

    const params = { "accountNum": accountNum };
    const history = await Parse.Cloud.run("history", params);
    //console.log("cloud code result= " + JSON.stringify(history));
    return history;
}

const getAccountType = async (parseAddress, accountNum) => {
        const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    console.log("in getHistory() and parse address is " + parseAddress)
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';

    const params = { "accountNum": accountNum };
    const accountType = await Parse.Cloud.run("getaccounttypeforaccountnum", params);
    return accountType;
}

const AccountDetail = (props) => {
    const [history, setHistory] = useState([]);
    const [parseAddress, setParseAddress] = useState("");
    const [accountType, setAccountType] = useState("");

    useEffect(() => {
        AsyncStorage.getItem('serverAddress')
        .then(address => {
            getHistory(address, 45000)
            .then(result => setHistory(result));
            console.log("result = " + JSON.stringify(history));
            getAccountType(address, 45000)
            .then(result => setAccountType(result));
        })
    }, [props.accountNum, parseAddress, setParseAddress])

    // i need to sort the transactions by date before rendering them...
    const transactions = 
        history.length !== 0 ? history
            .sort((a, b) => new Date(JSON.parse(JSON.stringify(b)).createdAt) - new Date(JSON.parse(JSON.stringify(a)).createdAt))
            .map(transaction => {
            const t = JSON.parse(JSON.stringify(transaction));
            var date = new Date(t.createdAt).toDateString();
            var amount = formatCurrency({amount : (+t.amount).toFixed(2), code: 'USD' })[0];
            return (
                <View style={styles.row} key={t.objectId}>
                    <View style={styles.cell}><Text>{date}</Text></View>
                    <View style={styles.cell}><Text>{t.action}</Text></View>
                    <View style={styles.cell}><Text style={styles.numbers}>{amount}</Text></View>
                </View>
            )
        }) : (
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text>{" "}</Text>
                    <Text>No transactions to display</Text>
                </View>
            </View>
        )

    const balance = history.length === 0 ? 0 : history.reduce((prev, current) => {
        return prev + JSON.parse(JSON.stringify(current)).amount 
    }, 0) 
    const formattedBalance = formatCurrency({amount : (balance).toFixed(2), code: 'USD' })[0];

    return (
        <ScrollView style={styles.main}>
            <Card title="Account Details">
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Account Number</Text></View>
                    <View style={styles.cell}><Text style={styles.numbers}>{props.accountNumber}</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Account Type</Text></View>
                    <View style={styles.cell}><Text style={styles.numbers}>{accountType}</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Current balance</Text></View>
                    <View style={styles.cell}><Text style={styles.numbers}>{formattedBalance}</Text></View>
                </View>
            </Card>
            <Card title="Recent Transactions">
                {transactions}
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