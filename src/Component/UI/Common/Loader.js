import React from 'react';
import './Loader.css';

const loader = (props) => {
    return props.loading ? <div className="loading" >Loading&#8230;</div> : null;
}

export default loader;