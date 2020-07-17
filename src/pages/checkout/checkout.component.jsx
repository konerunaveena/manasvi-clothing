import React from 'react';
import { connect } from 'react-redux';
import {  createStructuredSelector} from 'reselect';

import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckOutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems ,selectCartTotal} from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckOutPage = ({cartItems,cartTotal}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem => <CheckOutItem key={cartItem.id} cartItem = {cartItem}></CheckOutItem>)}
        <div className='total'><span>Total  : $ {cartTotal}</span></div>
        <div className='test-warning'>
            *Please use the following test credit card for payment *
            <br/>
            4242 4242 4242 4242 - Exp : 01/21 - CVV:123
        </div>
        <StripeCheckOutButton price={cartTotal}></StripeCheckOutButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems :selectCartItems,
    cartTotal :selectCartTotal
});

export default connect(mapStateToProps)(CheckOutPage);