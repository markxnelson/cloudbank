import React from 'react';
import { View } from 'react-native';
import Footer from './UI/Footer';
import MainView from './UI/MainView';

const Home = (props) => {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <MainView navigation={props.navigation} user={props.user} />
            <Footer navigation={props.navigation} onLogout={props.onLogout} />
        </View>
    );
};

export default Home;
