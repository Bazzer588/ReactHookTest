import React, { useReducer } from 'react';
import TextField from "./TextField";

export default React.memo( ({name, dispatch, defaultState = {}}) => {

    const [data, changeData] = useReducer( (state,action) => {
        const mod = { ...state, [action.name]: action.value };
        if (dispatch) dispatch({ name, value: mod });
        return mod;
    }, defaultState );

    return (
        <div>
            <TextField name="gender"      value={data.gender}      dispatch={changeData} />
            <TextField name="firstName"   value={data.firstName}   dispatch={changeData} />
            <TextField name="lastName"    value={data.lastName}    dispatch={changeData} />
            <TextField name="dateOfBirth" value={data.dateOfBirth} dispatch={changeData} />
        </div>
    );
});
