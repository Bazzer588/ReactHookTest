import React from 'react';

export default React.memo( ({ name, path, value = '', touched, onChangeField, dispatch, dispatchFieldChange, handler, ...rest }) => {

    // console.log('RTF',name,value);

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

    const id = path + '-' + name;

    return (
        <div className={cnm} key={id}>
            <label htmlFor={id}>{name}</label>
            <input
                id={id}
                autoComplete="off"
                type="text"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                {...rest}
            />
        </div>
    );
});
