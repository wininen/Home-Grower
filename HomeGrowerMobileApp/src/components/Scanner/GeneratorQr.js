import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import QRCode from 'react-native-qrcode-svg';
let username = null;
let setUsernameUUID = true;

const CreateUsernameUUID = () => {
  if (setUsernameUUID) {
    setUsernameUUID = false;
    username = uuid.v1();
    console.log('My username:');
    console.log(username);
  }
};

const CreateUUID = () => {
  return uuid.v1();
};

const returnUsername = () => {
  CreateUsernameUUID();
  return username;
};

const GenerateQRCode = param => {};

const GeneratorQr = {CreateUsernameUUID, returnUsername, CreateUUID};

export default GeneratorQr;
