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
            return { value: { ...value, firstName: 'Fred', lastNm: 'Smeeg' }, touched: { ...touched, firstName: true } };
        }
        if (gender==='Z') {
            return { value: {gender}, touched: {} }
        }
    }
    return state;
});

setHandler('modDateOfBirth', (state) => {
    //console.log('modDateOfBirth',state);
    if (state.value.dateOfBirth==='now') {
        state.value.dateOfBirth = (new Date()).toISOString();
        state.touched.dateOfBirth = true;
    }
    return state;
});

function PersonSection (props) {

    const {name, value = {}, touched = {}, dispatchFieldChange, dispatch} = props; // showErrors, path, coreData

    const changeField = useCallback( (dispatch,arr) => {
        arr.splice(0,0,{ name, handler: 'modPersonSection' });
        dispatchFieldChange(dispatch,arr);
    }, [dispatch] );

    function field (props) {
        const fnm = props.name;
        return <TextField path={name} value={value[fnm]} touched={touched[fnm]} dispatchFieldChange={changeField} dispatch={dispatch} {...props} />
    }

    function gp (props) {
        const fnm = props.name;
        return { path: name, value: value[fnm], touched: touched[fnm], dispatchFieldChange: changeField, dispatch, ...props };
    }

    /* // renders every time, loses focus
    function MField ({ fnm, ...rest }) {
        return (
            <TextField
                name={fnm} path={name} value={value[fnm]} touched={touched[fnm]}
                dispatchFieldChange={changeField} dispatch={dispatch} {...rest}
            />
        );
    }
    */

    return (
        <div>
            {field(Gender)}
            {field({ name: 'firstName' })}
            {field({ name: 'lastNm' })}
            {field({ name: 'dateOfBirth', handler: 'modDateOfBirth' })}
            <TextField {...gp(AgeOfPig)} max={10} min={0} />
            <TextField {...gp(SizeOfCow)} />
        </div>
    );

}

const Gender = { name: 'gender' };
const AgeOfPig = { name: 'ageOfPig', type: 'number' };
const SizeOfCow = { name: 'sizeOfCow' };

export default React.memo(PersonSection);
