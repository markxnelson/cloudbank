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
    const [accounts, setAccounts] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        console.log("getting accounts for user " + props.user)
        AsyncStorage.getItem('serverAddress')
        .then(address => {
            getAccounts(address, props.user)
            .then(accountNumbers => {
                accountNumbers.forEach(item => {
                    console.log("processing " + item);
                    getAccountType(address, item)
                    .then(type => {
                        getAccountBalance(address, item)
                        .then(balance => {
                            setAccounts((prev) => {
                                // first check if the account is already there, if so, update it
                                const updatedState = prev.map(entry => {
                                    if (entry.accountNumber === item) {
                                        // replace existing entry
                                        return {
                                            accountNumber: item,
                                            accountType: type,
                                            balance: formatCurrency({amount : (+balance).toFixed(2), code: 'USD' })[0]
                                        }
                                    } else { 
                                        // keep existing entry
                                        return entry;
                                    }
                                })
                                // if the account was not there, we need to add it
                                if (!prev.some(entry => entry.accountNumber === item)) {
                                    updatedState.push({
                                        accountNumber: item,
                                        accountType: type,
                                        balance: formatCurrency({amount : (+balance).toFixed(2), code: 'USD' })[0]
                                    })
                                }
                                return updatedState;
                            })
                        })
                    });
                })
            });
        })
        .catch(error => console.log(error))

        // force refresh after BACK 
        const willFocusSubscription = props.navigation.addListener('focus', () => setRefresh(refresh + 1));
    }, [refresh])

    // sort the account by account number
    const accountList = accounts.length !== 0 ? accounts
        .sort((a, b) => (+a.accountNumber) - (+b.accountNumber))
        .map(account => {
            return (
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('AccountDetail', { accountNumber: account.accountNumber })}>
                    <View style={styles.row} key={account.accountNumber}>
                        <View style={styles.cell}><Text>{account.accountNumber}</Text></View>
                        <View style={styles.widecell}><Text>{account.accountType}</Text></View>
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
    widecell: {
        flex: 3,
        alignSelf: 'stretch'
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