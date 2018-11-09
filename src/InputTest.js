import React, { useContext }  from 'react';
import {DispatchContext} from './App';

export const InputTest = React.memo( ({ name, value }) => {

    console.log('RENDER',name);

    const dispatch = useContext(DispatchContext);

    const onChange = (ev) => {
        const value = ev.target.value;
        dispatch({ type: 'SET', name, value });
    };

    return (
        <div className="form-field">
            <label htmlFor={name}>{name}</label>
            <input type="text" id={name} onChange={onChange} value={value || ''} />
        </div>
    );
});
