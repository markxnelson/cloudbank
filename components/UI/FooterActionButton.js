import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const FooterActionButton = props => {
    return (
        <View style={styles.actionButton} >
            <Pressable onPress={props.onPress}>
                <Text>{props.name}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        padding: 5,
        margin: 5,
        width: 68,
        height: 68,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
      }
  });

export default FooterActionButton;