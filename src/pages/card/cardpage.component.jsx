import React from 'react';
import styled from 'styled-components';


import CARD from '../../components/card/card.component';

const Text = styled.div`
    color: red;
    font-size : 24px;
    border : ${({isActive}) => isActive ? '1px solid red' : '3px dotted green'}
`

const textStyles = {
    color : 'red',
    fontSize:'24px'


}

const CardPage = () => (
    <>
        <CARD>
            <div style={textStyles}>THIS IS CARD COMPONENT</div>
        </CARD>
        <br/>
        <CARD>
            <Text isActive={false}>I'm Working with Styled Components</Text>
        </CARD>
    </>
    
);

export default CardPage;