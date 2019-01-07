import React from 'react';

export default React.memo( ({ name, value, onChangeField, dispatch }) => {

    console.log('RENDER TEXT FIELD',name,value);

    function onChange (ev) {
        if (dispatch) {
            dispatch({ name, value: ev.target.value });
        } else {
            onChangeField( name, ev.target.value );
        }
    }

    return (
        <div className="form-field">
            <label htmlFor={name}>{name}</label>
            <input
                type="text"
                onChange={onChange}
                value={value || ''}
            />
        </div>
    );
});
