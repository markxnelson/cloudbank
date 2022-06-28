import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import Card from '../UI/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';


const performDeposit = async (parseAddress, accountNum, amount) => {
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
    deposit.set("accountType", "Checking");
    deposit.save()
    .then((id) => console.log("saved with id " + JSON.stringify(id)),
        (error) => console.log("failed to save, error = " + error))

}

const Deposit = (props) => {
    const [toAccount, setToAccount] = useState('45000')
    const [amount, setAmount] = useState('0.00')
    const [parseAddress, setParseAddress] = useState("");
    
    useEffect(() => {
        AsyncStorage.getItem('serverAddress')
        .then(storedAddress => {
            console.log(storedAddress);
            storedAddress && setParseAddress(storedAddress);
        })
    }, [parseAddress, setParseAddress])

    const depositHandler = () => {
        performDeposit(parseAddress, toAccount, amount);
        Alert.alert(
            "Deposit",
            "Successfully deposited $" + amount +" in to account " + toAccount,
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
                    <Text>To account:</Text>
                    <View style={{ borderWidth: 1, borderColor: 'gray' }}>
                        <Picker
                            selectedValue={toAccount}
                            onValueChange={currentToAccount => setToAccount(currentToAccount)}>
                            <Picker.Item value="45000" label="45000 : Checking" />
                            <Picker.Item value="45102" label="45102 : Savings" />
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