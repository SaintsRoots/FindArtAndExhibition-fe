import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const FlutterwavePayment = ({ amount, email, phone, name }) => {
  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "Art Finder and exhibition",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            closePaymentModal(); 
          },
          onClose: () => {},
        });
      }}
    >
      {`Pay ${amount} FRW `}
    </button>
  );
};

export default FlutterwavePayment;
