import React from 'react';
import { View } from 'react-native';
import Footer from './components/UI/Footer';
import MainView from './components/UI/MainView';

const Home = () => {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <MainView />
            <Footer />
        </View>
    );
};

export default Home;
