import React, { useState, useContext } from 'react';
import { TextInput, StyleSheet, Button } from 'react-native';
import Card from '../UI/Card';
import AuthContext from '../../store/auth-context';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const ctx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
        ctx.onLogin(email, password);
    };

    return (
        <Card title="Login to CloudBank" className={styles.login}>
            <TextInput
                style={styles.login}
                placeholder="Email"
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