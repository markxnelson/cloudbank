import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Accounts from '../Accounts/Accounts';
import Investments from '../Investments/Investments';
import Insurance from '../Insurance/Insurance';
import CreditCards from '../CreditCards/CreditCards';

const MainView = (props) => {
    return (
        <ScrollView style={styles.main}>
            <View>
                <Text style={{margin: 5}}>Welcome back, {props.user}!</Text>
            </View>
            <Accounts navigation={props.navigation} user={props.user} />
            <Investments />
            <Insurance />
            <CreditCards />
            {/* hack so that footer will not cover the bottom of the main content */}
            <Text style={{height: 120}}>{" "}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 10,
        backgroundColor: '#e1e2e3',
        width: '100%'
      }
  });

export default MainView;