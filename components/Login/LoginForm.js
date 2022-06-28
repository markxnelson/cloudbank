import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Button } from 'react-native';
import Card from '../UI/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [parseAddress, setParseAddress] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(email, password, parseAddress);
    };

    useEffect(() => {
        AsyncStorage.getItem('serverAddress')
        .then(storedAddress => {
            console.log(storedAddress);
            storedAddress && setParseAddress(storedAddress);
        })
    }, [parseAddress, setParseAddress])

    return (
        <Card title="Login to CloudBank" className={styles.login}>
            <TextInput
                style={styles.login}
                placeholder="server ip"
                value={parseAddress}
                onChangeText={setParseAddress}
            />
            <TextInput
                style={styles.login}
                placeholder="username"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.login}
                secureTextEntry={true}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
            />
            <Button
                onPress={submitHandler}
                className={styles.btn}
                title="Login"
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    login: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black',
        borderColor: 'gray'
    },
});

export default LoginForm;