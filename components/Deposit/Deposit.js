import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import Card from '../UI/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';


const performDeposit = async (parseAddress, accountNum, amount, accountType) => {
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';

    const Deposit = Parse.Object.extend("BankAccount");
    const deposit = new Deposit();
    deposit.set("accountNum", +accountNum);
    deposit.set("action", "Deposit");
    deposit.set("amount", +amount);
    deposit.set("userId", "mark");
    deposit.set("accountType", accountType);
    deposit.save()
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
    const Parse = require('parse/react-native.js');
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("APPLICATION_ID");
    //console.log("in getAccountType() and parse address is " + parseAddress)
    //console.log("and accountNum is " + accountNum)
    Parse.serverURL = 'http://' + parseAddress + ':1337/parse';

    const params = { "accountNum": +accountNum };
    const accountType = await Parse.Cloud.run("getaccounttypeforaccountnum", params);
    //console.log("mark: " + accountType)
    return accountType;
}

const Deposit = (props) => {
    const [toAccount, setToAccount] = useState('45000')
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
            <Picker.Item key={account.accountNumber} value={account.accountNumber} label={account.accountNumber + " - " + account.accountType} />
        )
    }) : <></>

    const depositHandler = async () => {
        const accountType = await getAccountType(parseAddress, toAccount);
        //console.log("mark - accountType = " + accountType);
        performDeposit(parseAddress, toAccount, amount, accountType);
        Alert.alert(
            "Deposit",
            "Successfully deposited $" + amount +" in to account " + toAccount,
            [
                {
                    text: 'OK',
                    style: 'cancel',
                    onPress: () => {
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
                    title="Deposit"
                    onPress={depositHandler}
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

export default Deposit;