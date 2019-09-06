import React from 'react';

function Price(props) {
    return (
        <span>{props.format}{props.amount}</span>
    );
}

export default Price;