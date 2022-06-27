import React from 'react';
import { Image } from 'react-native';
import Card from './Card';

const CloudBankMasthead = () => {
    return (
        <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image 
                source={require('./cloudbank.png')}
                style={{ height: 84}} />
        </Card>
    )
}

export default CloudBankMasthead;