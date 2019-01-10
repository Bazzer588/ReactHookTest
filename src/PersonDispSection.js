import React, { useCallback } from 'react';
import TextField from './TextField'
import {setHandler} from "./reducer";

/*function onChangeSection (field, fieldValue, sectionValue) {

    if (field==='gender') {
        return { gender: fieldValue }; // reset all other fields
    }

    return { ...sectionValue, [field]: fieldValue };
}*/

setHandler('modPersonSection', (state,field) => {
    if (field==='gender') {
        const {gender} = state.value;
        if (gender==='X') {
            const { value, touched } = state;
            return { value: { ...value, firstName: 'Fred' }, touched: { ...touched, firstName: true } };
        }
        if (gender==='Z') {
            return { value: {gender}, touched: {} }
        }
    }
    return state;
});

setHandler('modDateOfBirth', (state) => {
    console.log('modDateOfBirth',state);
    if (state.value.dateOfBirth==='now') {
        state.value.dateOfBirth = (new Date()).toISOString();
    }
    return state;
});

function PersonSection (props) {

    const {name, value = {}, touched = {}, dispatchFieldChange, dispatch} = props; // touched, showErrors, name, path, coreData

    const changeField = useCallback( (dispatch,arr) => {
        arr.splice(0,0,{ name, handler: 'modPersonSection' });
        dispatchFieldChange(dispatch,arr);
    }, [dispatch] );

    return (
        <div>
        <TextField name="gender"      value={value.gender}      touched={touched.gender}      dispatchFieldChange={changeField} dispatch={dispatch} />
        <TextField name="firstName"   value={value.firstName}   touched={touched.firstName}   dispatchFieldChange={changeField} dispatch={dispatch} />
        <TextField name="lastName"    value={value.lastName}    touched={touched.lastName}    dispatchFieldChange={changeField} dispatch={dispatch} />
        <TextField name="dateOfBirth" value={value.dateOfBirth} touched={touched.dateOfBirth} dispatchFieldChange={changeField} dispatch={dispatch} handler="modDateOfBirth"/>
        </div>
    );

}

export default React.memo(PersonSection);
