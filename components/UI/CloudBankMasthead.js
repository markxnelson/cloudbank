// Copyright (c) 2022, Oracle and/or its affiliates.
// Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.

import React from 'react';
import {Image} from 'react-native';
import Card from './Card';

const CloudBankMasthead = () => {
  return (
    <Card style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('./cloudbank.png')} style={{height: 84}} />
    </Card>
  );
};

export default CloudBankMasthead;
