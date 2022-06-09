import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Footer = (props) => {
    return (
        <View style={styles.footer}>
            <Text>bottom</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        height: 100,
        backgroundColor: 'red',
        left: 0,
        right: 0
      }
  });

export default Footer;