import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Card from '../UI/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency } from "react-native-format-currency";

const getAccounts = async (parseAddress, user) => {
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    console.log("in getAccounts() and parse address is " + parseAddress)
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';

    const params = { "userId": user };
    const accounts = await Parse.Cloud.run("getaccountsforuser", params);
    return accounts;
}

const getAccountType = async (parseAddress, accountNum) => {
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    console.log("in getAccountType() for " + accountNum)
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';
    const params = { "accountNum": accountNum };
    const accountType = await Parse.Cloud.run("getaccounttypeforaccountnum", params);
    return accountType;
}

const Accounts = (props) => {
    const [parseAddress, setParseAddress] = useState("");
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        console.log("getting accounts for user " + props.user)
        AsyncStorage.getItem('serverAddress')
        .then(address => {
            getAccounts(address, props.user)
            .then(result => {
                setAccounts(result);
                console.log("result = " + JSON.stringify(result));
            });
            // getAccountType(address, route.params.accountNumber)
            // .then(result => setAccountType(result));
        })
    }, [props.user, parseAddress, setParseAddress])

    const accountList = accounts.length !== 0 ? accounts
        .map(account => {
            let accountType;
            AsyncStorage.getItem('serverAddress')
            .then(address => {
                getAccountType(address, account)
                .then(result => {
                    console.log("account type result = " + result);
                    accountType = result;
                });
            })
            console.log("mark - accountType = " + accountType);

            return (
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('AccountDetail', { accountNumber: account })}>
                    <View style={styles.row} key={account}>
                        <View style={styles.cell}><Text>{account}</Text></View>
                        <View style={styles.cell}><Text>{accountType}</Text></View>
                        <View style={styles.cell}><Text style={styles.numbers}>$1,234.56</Text></View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }) : (
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text>{" "}</Text>
                    <Text>No accounts to display</Text>
                </View>
            </View>
        )

    return (
        <Card title="My Accounts" >
            {accountList}
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