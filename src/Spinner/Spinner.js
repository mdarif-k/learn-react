import React from 'react';
import './Spinner.css'

const spinner = (props) => {
    let loading = false;
    if(props.loading) {
        loading = true;    
    } else {
        loading = false; 
    }
    return (
        loading ? <div className="loader">Loading...</div> : null
    )
}

export default spinner;

