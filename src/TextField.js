import React from 'react';

export default React.memo( ({ name, value = '', touched, onChangeField, dispatch, dispatchFieldChange, handler }) => {

    // console.log('RENDER TEXT FIELD',name,value);

    function onChange (ev) {
        const value = ev.target.value;
        if (dispatchFieldChange) {
            dispatchFieldChange(dispatch,[{ name, value, touched, handler }]);
        } else if (dispatch) {
            dispatch({ name, value: ev.target.value });
        } else {
            onChangeField( name, ev.target.value );
        }
    }

    const onBlur = (!touched && dispatchFieldChange) ? () =>
        dispatchFieldChange(dispatch, [{ name, value, touched: true }] ) : undefined;

    const cnm = !!touched ? 'form-field ff-touched' : 'form-field';

    return (
        <div className={cnm}>
            <label htmlFor={name}>{name}</label>
            <input
                type="text"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
            />
        </div>
    );
});
