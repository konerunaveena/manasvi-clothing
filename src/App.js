import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import CardPage from './pages/card/cardpage.component';
import SagaPage from "./pages/sagapage/sagapage.component";
import HomePage from './pages/homepage/home.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import { addCollectionAndItems } from './firebase/firebase-utils';

import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { checkUserSession } from "./redux/user/user.actions";

class App extends React.Component {

  unsubscribeFromAuth = null;
  

  componentDidMount () {

    const {collectionsArray, checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header></Header>
        <Switch>
        <Route exact path='/saga' component ={SagaPage}></Route>
          <Route exact path='/card' component ={CardPage}></Route>
          <Route exact path='/' component ={HomePage}></Route>
          <Route path='/shop' component ={ShopPage}></Route>
          <Route exact path='/checkout' component ={CheckOutPage}></Route>
          <Route exact path='/signin' render = {()=> this.props.currentUser ?(<Redirect to='/' />): (<SignInAndSignUpPage /> )}></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser  : selectCurrentUser
  //collectionsArray : selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession :  () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
