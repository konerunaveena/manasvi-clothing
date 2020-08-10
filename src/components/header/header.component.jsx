import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';

import { auth } from '../../firebase/firebase-utils';
import CartIcon  from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from "../../assets/crown.svg";


// import "./header.styles.scss";

import { HeaderContainer, LogoContainer,OptionsContainer, OptionLink,OptionDiv } from './header.styles';

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo"></Logo>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/card">CARD</OptionLink>
            <OptionLink to="/shop">SHOP</OptionLink>
            <OptionLink to="/contact">CONTACT</OptionLink>
            {
                currentUser ? (<OptionLink as='div' onClick = { () => auth.signOut()}> SIGN OUT</OptionLink>) : ( <OptionLink className="option" to="/signin">SIGN IN</OptionLink> )
            }
            <CartIcon></CartIcon>
        </OptionsContainer>
        {
            hidden ? (null ) : (<CartDropDown/>)
        }
        { hidden ? (null ) : (<CartDropDown/>)}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden : selectCartHidden
});

export default connect(mapStateToProps)(Header);