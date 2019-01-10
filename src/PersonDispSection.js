import React, { useCallback } from 'react';
import TextField from './TextField'

/*function onChangeSection (field, fieldValue, sectionValue) {

    if (field==='gender') {
        return { gender: fieldValue }; // reset all other fields
    }

    return { ...sectionValue, [field]: fieldValue };
}*/

function PersonSection (props) {

    const {name, value = {}, touched = {}, dispatchFieldChange, dispatch} = props; // touched, showErrors, name, path, coreData

    const changeField = useCallback( (dispatch,arr) => {
        arr.splice(0,0,{ name });
        dispatchFieldChange(dispatch,arr);
    }, [dispatch] );

    return (
        <div>
        <TextField name="gender"      value={value.gender}      touched={touched.gender}      dispatchFieldChange={changeField} dispatch={dispatch} />
        <TextField name="firstName"   value={value.firstName}   touched={touched.firstName}   dispatchFieldChange={changeField} dispatch={dispatch} />
        <TextField name="lastName"    value={value.lastName}    touched={touched.lastName}    dispatchFieldChange={changeField} dispatch={dispatch} />
        <TextField name="dateOfBirth" value={value.dateOfBirth} touched={touched.dateOfBirth} dispatchFieldChange={changeField} dispatch={dispatch} />
        </div>
    );

}

export default React.memo(PersonSection);
