import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

const MainView = (props) => {
    return (
        <ScrollView style={styles.main}>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content near end</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content</Text>
            <Text>main content ends</Text>
            {/* hack so that footer will not cover the bottom of the main content */}
            <Text style={{height: 120}}>{" "}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 10,
        backgroundColor: 'blue',
        width: '100%'
      }
  });

export default MainView;