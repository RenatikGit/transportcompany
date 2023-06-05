import React from 'react';

const Textarea = (props) => {
    const handleChange = (event) => {
        if (props.onChange) {
            props.onChange(event.target.value);
        }
    };

    return (
        <textarea
            value={props.value}
            onChange={handleChange}
            placeholder={props.placeholder}
        />
    );
};

export default Textarea;
