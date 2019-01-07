import React, {useState, useCallback} from 'react';
import TextField from "./TextField";

export default React.memo( () => {

    const [data, changeData] = useState({});

    /*const onChangeField = useCallback((name,value) => {
        changeData({ ...data, [name]: value });
    }, [] );*/

    const onChangeField = useCallback((name, value) => {
        changeData( oldData => {
            if (name==='gender' && value==='X')
                return { ...oldData, [name]: value, firstName: 'XXX' };
            if (name==='gender')
                return { gender: value };
            return { ...oldData, [name]: value };
        });
    }, []);

    return (
        <div>
            <TextField name="gender"      value={data.gender}      onChangeField={onChangeField} />
            <TextField name="firstName"   value={data.firstName}   onChangeField={onChangeField} />
            <TextField name="lastName"    value={data.lastName}    onChangeField={onChangeField} />
            <TextField name="dateOfBirth" value={data.dateOfBirth} onChangeField={onChangeField} />
        </div>
    );
});
