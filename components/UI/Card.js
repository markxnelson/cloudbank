import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = (props) => {
    return (
        <View
            onClick={props.onClick}
            title={props.title}
            style={styles.card}
        >
            {props.title && <Text style={styles.heading}>{props.title}</Text>}
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        margin: 5
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        padding: 5
    }
});

export default Card;