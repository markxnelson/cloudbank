import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FooterActionButton from './FooterActionButton';

const Footer = (props) => {
    const onPressDepositHandler = props => {
        console.log("pressed deposit")
    }

    const onPressPaymentHandler = props => {
        console.log("pressed payment")
    }

    const onPressBillPayHandler = props => {
        console.log("pressed bill pay")
    }

    const onPressMoreHandler = props => {
        console.log("pressed more")
    }

    return (
        <View style={styles.footer}>
            <FooterActionButton
                name="Deposit"
                onPress={() => props.navigation.navigate('Deposit')}
            />
            <FooterActionButton
                name="Transfer"
                onPress={() => props.navigation.navigate('Transfer')}
            />
            <FooterActionButton
                name="Payment"
                onPress={onPressPaymentHandler}
            />
            <FooterActionButton
                name="Bill Pay"
                onPress={onPressBillPayHandler}
            />
            <FooterActionButton
                name="Logout"
                onPress={props.onLogout}  
            />
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        height: 78,
        backgroundColor: '#8194b3',
        left: 0,
        right: 0,
        borderColor: '#91b1e3',
        borderTopWidth: 2
    }
});

export default Footer;