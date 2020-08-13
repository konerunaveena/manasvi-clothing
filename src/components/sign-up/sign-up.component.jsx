import React from 'react';
import { connect } from "react-redux";
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart} from '../../redux/user/user.actions';

import './sign-up.styles.scss';

class SingnUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName : '',
            email : '',
            password : '',
            confirmPassword  :''
        }
    }

    handleSubmit = async event => {
            event.preventDefault();
            const { signUpStart } =  this.props;
            const { displayName,email,password,confirmPassword } = this.state;
            if( password !== confirmPassword){
                alert("passwords dont match");
                return;
            }
            signUpStart({ displayName,email,password })

            
    }

    handleChange = event =>{
        const {name,value} = event.target;
        this.setState ({[name] : value});
    }

    render(){
        const { displayName,email,password,confirmPassword } = this.state;
        return(
        <div className="sign-up">
            <h2 className="title">I dont have a account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
                <FormInput type="text" name="displayName" label="Display Name" value={displayName} handleChange={this.handleChange} required />
                <FormInput type="email" name="email" label="Email" value={email} handleChange={this.handleChange} required />
                <FormInput type="password" name="password" label="Password" value={password} handleChange={this.handleChange} required />
                <FormInput type="password" name="confirmPassword" label="Confirm Password" value={confirmPassword} handleChange={this.handleChange} required />
                <div className="buttons">
                    <CustomButton type="submit">Sign Up</CustomButton>
                </div>
            </form>

        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) =>({
    signUpStart : userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToProps)(SingnUp);