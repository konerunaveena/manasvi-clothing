import React from 'react';

import StripeCheckOut from 'react-stripe-checkout';

const StripeCheckOutButton = ({ price })=> {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_NFSSSQccvTybcM8nwEMDfMKc00NKbKHECw';

    const onToken = token => {
        console.log(token);
        alert("Payment Succesful");

    }

    return (
        <StripeCheckOut label='Pay Now' name='Manasvi Clothing Ltd.'
        billingAddress shippingAddress image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is $ ${price}`} amount={priceForStripe}
        panelLabel='Pay Now' token={onToken}
        stripeKey={publishableKey} ></StripeCheckOut>
    )
};

export default StripeCheckOutButton;