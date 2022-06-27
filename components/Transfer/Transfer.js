import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import Card from '../UI/Card';

const Transfer = (props) => {
    const [fromAccount, setFromAccount] = useState('100')
    const [toAccount, setToAccount] = useState('102')
    const [amount, setAmount] = useState('0.00')

    const transferHandler = () => {
        console.log("Pressed the transfer button, with data:")
        console.log("from account: " + fromAccount)
        console.log("to account: " + toAccount)
        console.log("Amount: " + amount)
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
                            <Picker.Item value="100" label="100 : Checking" />
                            <Picker.Item value="102" label="102 : Savings" />
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
                            <Picker.Item value="100" label="100 : Checking" />
                            <Picker.Item value="102" label="102 : Savings" />
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