import React from 'react';
import { connect } from "react-redux";
import SagaComponent from '../../components/saga/saga.component';

const SagaPage = props =>{
    const { increment, decrement, value } =  props;
    return(
        <SagaComponent>
            {value}
            <button onClick={increment}>Add 1</button>
            <button onClick={decrement}>Minus 1</button>
        </SagaComponent>
    )
};

const mapStateToProps = state =>({
    value : state.sagaValue.value
});

const mapDispatchToProps = dispatch => ({
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' })
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SagaPage);

