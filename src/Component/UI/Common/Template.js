import React from 'react';

const Template = (props) => {
    return (
        <div dangerouslySetInnerHTML={{__html: props.html}}></div>
    )
}

export default Template;