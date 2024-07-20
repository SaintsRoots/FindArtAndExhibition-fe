import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

export default function App({totalPrice,email,phone_number, name, amaunt}) {
   const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: amaunt,
    currency: 'FRW',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: `${email}`,
      phone_number: `${phone_number}`,
      name: `${name}`,
    },
    customizations: {
      title: 'Art Finder and exhibition',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: `Pay  ${totalPrice} Frw`,
    callback: (response) => {
       console.log(response);
      closePaymentModal() 
    },
    onClose: () => {},
  };

  return (
    <div className=" bg-primary text-white p-2 rounded-md flex justify-center items-center ">
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}