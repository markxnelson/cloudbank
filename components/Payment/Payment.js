import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import Card from '../UI/Card';

const Payment = (props) => {
    const [fromAccount, setFromAccount] = useState('100')
    const [toAccount, setToAccount] = useState('102')
    const [amount, setAmount] = useState('0.00')

    const paymentHandler = () => {
        Alert.alert(
            "Payment",
            "Successfully paid $" + amount + " from account " + fromAccount + " to external account " + toAccount,
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
            <Card title="Send payment to external account">
                <View>
                    <Text>{' '}</Text>
                    <Text>From your account:</Text>
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
                    <Text>To external account:</Text>
                    <View style={{ borderWidth: 1, borderColor: 'gray' }}>
                        <TextInput
                            placeholder="123"
                            keyboardType='number-pad'
                            value={toAccount}
                            onChangeText={currentToAccount => setToAccount(currentToAccount)}
                        />
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
                    title="Pay"
                    onPress={paymentHandler}
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

export default Payment;