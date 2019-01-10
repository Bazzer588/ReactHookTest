import React, { useCallback } from 'react';

function onChangeSection (field, fieldValue, sectionValue) {

    if (field==='gender') {
        return { gender: fieldValue }; // reset all other fields
    }

    return { ...sectionValue, [field]: fieldValue };
}

function PersonSection (props) {

    const {value, dispatchFieldChange, path, dispatch} = props; // touched, showErrors, name, path, coreData

    const changeField = useCallback( (dispatch,name,v) => {
        dispatchFieldChange(dispatch,name,v);
    }, [dispatch] );

    return (
        <>
        <TextField name="gender"      value={value.gender}      dispatchFieldChange={changeField} />
        <TextField name="firstName"   value={value.firstName}   dispatchFieldChange={changeField} />
        <TextField name="lastName"    value={value.lastName}    dispatchFieldChange={changeField} />
        <TextField name="dateOfBirth" value={value.dateOfBirth} dispatchFieldChange={changeField} />
        </>
    );

}

export default React.memo(PersonSection);
