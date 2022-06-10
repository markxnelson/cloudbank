import React from 'react';
import { View } from 'react-native';
import Footer from './UI/Footer';
import MainView from './UI/MainView';

const Home = () => {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <MainView />
            <Footer />
        </View>
    );
};

export default Home;
