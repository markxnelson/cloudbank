import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import Card from '../UI/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const performTransfer = async (parseAddress, fromAccountNum, toAccountNum, amount, accountType) => {
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';

    const Transfer = Parse.Object.extend("BankAccount");
    const transfer = new Transfer();
    transfer.set("accountNum", +fromAccountNum);
    transfer.set("action", "Transfer");
    transfer.set("amount", +amount);
    transfer.set("userId", "mark");
    transfer.set("toAccountNum", +toAccountNum);
    transfer.set("accountType", accountType);
    transfer.save()
    .then((id) => console.log("saved with id " + JSON.stringify(id)),
        (error) => console.log("failed to save, error = " + error))
}

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

const Transfer = (props) => {
    const [fromAccount, setFromAccount] = useState('')
    const [toAccount, setToAccount] = useState('')
    const [amount, setAmount] = useState('0.00')
    const [parseAddress, setParseAddress] = useState('');
    const [accounts, setAccounts] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('serverAddress')
        .then(storedAddress => {
            console.log(storedAddress);
            storedAddress && setParseAddress(storedAddress);
        })
    }, [parseAddress, setParseAddress])

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
                        setAccounts((prev) => [...prev, {
                            accountNumber: item,
                            accountType: type
                        }])
                        // this is a hack to make sure that the controlled state is initialized
                        setFromAccount(item)
                        setToAccount(item)
                    })
                    .catch(error => console.log(error))
                })
            })
        })
    }, [props.user])

    const accountList = accounts.length !== 0 ? accounts
        .sort((a, b) => (+b.accountNumber) - (+a.accountNumber))
        .map(account => {
            return (
                <Picker.Item value={account.accountNumber} label={account.accountNumber + " - " + account.accountType} />
            )
        }) : <></>

    const transferHandler = () => {
        // get the account type
        const accountType = accounts.find(item => item.accountNumber === fromAccount).accountType

        performTransfer(parseAddress, fromAccount, toAccount, amount, accountType);
        Alert.alert(
            "Transfer",
            "Successfully transfered $" + amount + " from account " + fromAccount + " to account " + toAccount,
            [
                {
                    text: 'OK',
                    style: 'cancel',
                    onPress: () => {
                        console.log('ok pressed')
                        props.navigation.navigate('Home')
                    }
                }
            ],
            {
                cancelable: true,
                onDismiss: () => {
                    console.log('dismissed')
                    props.navigation.navigate('Home')
                }
            }
            
        )
        
    }

    return (
        <ScrollView style={styles.main}>
            <Card title="Transfer between accounts">
                <View>
                    <Text>{' '}</Text>
                    <Text>From account:</Text>
                    <View style={{ borderWidth: 1, borderColor: 'gray' }}>
                        <Picker
                            selectedValue={fromAccount}
                            onValueChange={currentFromAccount => setFromAccount(currentFromAccount)}>
                            {accountList}
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text>{' '}</Text>
                    <Text>To account:</Text>
                    <View style={{ borderWidth: 1, borderColor: 'gray' }}>
                        <Picker
                            selectedValue={toAccount}
                            onValueChange={currentToAccount => setToAccount(currentToAccount)}>
                            {accountList}
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text>{' '}</Text>
                    <Text>Amount:</Text>
                    <View style={{ borderWidth: 1, borderColor: 'gray' }}>
                        <TextInput
                            placeholder="0.00"
                            keyboardType='number-pad'
                            value={amount}
                            onChangeText={currentAmount => setAmount(currentAmount)}
                        />
                    </View>
                    <Text>{' '}</Text>

                </View>
                <Button
                    title="Transfer"
                    onPress={transferHandler}
                />
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

export default Transfer;