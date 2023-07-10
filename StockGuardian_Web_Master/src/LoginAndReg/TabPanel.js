import React from 'react';

function TabPanel(props) {
    const {value, index, children} = props;
    return (
        value === index ? children : ''
    )
}

export default TabPanel;