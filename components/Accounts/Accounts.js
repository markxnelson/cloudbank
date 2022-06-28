import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Card from '../UI/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency } from "react-native-format-currency";

const getAccounts = async (parseAddress, user) => {
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    //console.log("in getAccounts() and parse address is " + parseAddress)
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';

    const params = { "userId": user };
    const accounts = await Parse.Cloud.run("getaccountsforuser", params);
    return accounts;
}

const getAccountType = async (parseAddress, accountNum) => {
    console.log("mark in getAccountType, parseAdress = " + parseAddress + " and accountNum = " + accountNum);
    if (parseAddress.length < 1) { return }
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    // console.log("in getAccountType() for " + accountNum)
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';
    const params = { "accountNum": accountNum };
    const accountType = await Parse.Cloud.run("getaccounttypeforaccountnum", params);
    console.log("accountType is " + accountType);
    return accountType;
}

const getAccountBalance = async (parseAddress, accountNum) => {
    console.log("mark in getAccountBalance, parseAdress = " + parseAddress + " and accountNum = " + accountNum);
    if (parseAddress.length < 1) { return }
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';
    const params = { "accountNum": accountNum };
    const balance = await Parse.Cloud.run("balance", params);
    console.log("balance is " + balance);
    return balance;
}

const Accounts = (props) => {
    const [parseAddress, setParseAddress] = useState("");
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        console.log("getting accounts for user " + props.user)
        AsyncStorage.getItem('serverAddress')
        .then(address => {
            setParseAddress(address); // this is a nasty hack
            getAccounts(address, props.user)
            .then(accountNumbers => {
                //setAccounts(result);
                // TODO - we could iterate through them here and get the type and balance,
                //        and store these in a local state object, not just a list of numbers ... 
                accountNumbers.forEach(item => {
                    console.log("processing " + item);
                    getAccountType(address, item)
                    .then(type => {
                        getAccountBalance(address, item)
                        .then(balance => {
                            // TODO - need to check for duplicate account numbers!!!
                            setAccounts((prev) => [...prev,
                                {
                                    accountNumber: item,
                                    accountType: type,
                                    balance: formatCurrency({amount : (+balance).toFixed(2), code: 'USD' })[0]
                                }]
                            )
                        })
                    });
                })
            });
        })
        .catch(error => console.log(error))
    }, [props.user])

    const accountList = accounts.length !== 0 ? accounts
        .map(account => {
            return (
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('AccountDetail', { accountNumber: account.accountNumber })}>
                    <View style={styles.row} key={account.accountNumber}>
                        <View style={styles.cell}><Text>{account.accountNumber}</Text></View>
                        <View style={styles.cell}><Text>{account.accountType}</Text></View>
                        <View style={styles.cell}><Text style={styles.numbers}>{account.balance}</Text></View>
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